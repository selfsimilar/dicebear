import type { Color, Component, ComponentValue, Definition } from '../types';

export class DefinitionModel {
  public readonly definition: Definition;

  private indexedComponents: Map<string, Component> = new Map();
  private indexedComponentValues: Map<string, Map<string, ComponentValue>> =
    new Map();
  private indexedColors: Map<string, Color> = new Map();

  constructor(definition: Definition) {
    this.definition = definition;

    this.indexComponents();
    this.indexColors();
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
    return this.indexedComponents.get(name);
  }

  getComponentValueByName(
    componentName: string,
    name: string,
  ): ComponentValue | undefined {
    return this.indexedComponentValues.get(componentName)?.get(name);
  }

  getColorByName(name: string): Color | undefined {
    return this.indexedColors.get(name);
  }

  private indexComponents() {
    for (const component of this.getComponents()) {
      const componentValuesMap = new Map<string, ComponentValue>();

      for (const componentValue of component.values) {
        componentValuesMap.set(componentValue.name, componentValue);
      }

      this.indexedComponents.set(component.name, component);
      this.indexedComponentValues.set(component.name, componentValuesMap);
    }
  }

  private indexColors() {
    for (const color of this.getColors()) {
      this.indexedColors.set(color.name, color);
    }
  }
}
