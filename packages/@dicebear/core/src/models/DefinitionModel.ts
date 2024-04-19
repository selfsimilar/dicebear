import { DependencyHelper } from '../helpers/DependencyHelper';
import type {
  Color,
  Component,
  ComponentValue,
  Definition,
  Dependencies,
  Properties,
} from '../types';

type IndexedComponents = Map<string, Component>;
type IndexedComponentValues = Map<string, Map<string, ComponentValue>>;
type IndexedColors = Map<string, Color>;

type BodyDependencies = Dependencies;
type ComponentValueDependencies = Map<string, Map<string, Dependencies>>;

export class DefinitionModel {
  private readonly definition: Definition;

  private readonly components: IndexedComponents;
  private readonly componentValues: IndexedComponentValues;
  private readonly colors: IndexedColors;

  private readonly bodyDependencies: BodyDependencies;
  private readonly componentValueDependencies: ComponentValueDependencies;

  constructor(definition: Definition) {
    this.definition = definition;

    this.components = this.indexComponents();
    this.componentValues = this.indexComponentValues();
    this.colors = this.indexColors();

    this.bodyDependencies = this.indexBodyDependencies();
    this.componentValueDependencies = this.indexComponentValueDependencies();
  }

  getMetadata(): Definition['metadata'] {
    return this.definition.metadata;
  }

  getBody(): Definition['body'] {
    return this.definition.body;
  }

  getAttributes(): Exclude<Definition['attributes'], undefined> {
    return this.definition.attributes ?? [];
  }

  getComponents(): Exclude<Definition['components'], undefined> {
    return this.definition.components ?? [];
  }

  getColors(): Exclude<Definition['colors'], undefined> {
    return this.definition.colors ?? [];
  }

  getComponentByName(name: string): Component | undefined {
    return this.components.get(name);
  }

  getComponentValueByName(
    componentName: string,
    name: string,
  ): ComponentValue | undefined {
    return this.componentValues.get(componentName)?.get(name);
  }

  getColorByName(name: string): Color | undefined {
    return this.colors.get(name);
  }

  getDependenciesByProperties(properties: Properties): Dependencies {
    const dependencies: Dependencies = {
      components: new Set(...this.bodyDependencies.components),
      colors: new Set(...this.bodyDependencies.colors),
    };

    const unprocessed = [...this.bodyDependencies.components];

    while (unprocessed.length > 0) {
      const component = unprocessed.pop()!;
      const componentValue = properties.get(component);

      if (typeof componentValue !== 'string') {
        continue;
      }

      const componentValueDependencies = this.componentValueDependencies
        .get(component)
        ?.get(componentValue);

      if (!componentValueDependencies) {
        continue;
      }

      for (const dependency of componentValueDependencies.components) {
        if (dependencies.components.has(dependency)) {
          continue;
        }

        dependencies.components.add(dependency);
        unprocessed.push(dependency);
      }

      for (const dependency of componentValueDependencies.colors) {
        dependencies.colors.add(dependency);
      }
    }

    return dependencies;
  }

  private indexBodyDependencies(): BodyDependencies {
    return DependencyHelper.getDependenciesFromSvg(this.definition.body);
  }

  private indexComponentValueDependencies(): ComponentValueDependencies {
    return new Map(
      this.getComponents().map((component) => [
        component.name,
        new Map(
          component.values.map((componentValue) => [
            componentValue.name,
            DependencyHelper.getDependenciesFromSvg(componentValue.content),
          ]),
        ),
      ]),
    );
  }

  private indexComponents(): IndexedComponents {
    return new Map(
      this.getComponents().map((component) => [component.name, component]),
    );
  }

  private indexComponentValues(): IndexedComponentValues {
    return new Map(
      this.getComponents().map((component) => [
        component.name,
        new Map(
          component.values.map((componentValue) => [
            componentValue.name,
            componentValue,
          ]),
        ),
      ]),
    );
  }

  private indexColors(): IndexedColors {
    return new Map(this.getColors().map((color) => [color.name, color]));
  }
}
