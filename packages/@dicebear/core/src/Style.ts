import { mask } from 'superstruct';
import { DefinitionStruct } from './structs/DefinitionStruct';
import {
  ColorsFromStyleOptions,
  ComponentsFromStyleOptions,
  Definition,
  DefinitionAttributeList,
  DefinitionBody,
  DefinitionColor,
  DefinitionColorList,
  DefinitionComponent,
  DefinitionComponentList,
  DefinitionComponentValue,
  DefinitionMetadata,
  StyleOptions,
} from './types';

type IndexedComponents<S extends StyleOptions> = Map<
  ComponentsFromStyleOptions<S> | string,
  DefinitionComponent
>;

type IndexedComponentValues<S extends StyleOptions> = Map<
  ComponentsFromStyleOptions<S> | string,
  Map<string, DefinitionComponentValue>
>;

type IndexedColors<S extends StyleOptions> = Map<
  ColorsFromStyleOptions<S> | string,
  DefinitionColor
>;

export class Style<S extends StyleOptions = StyleOptions> {
  private readonly definition: Definition;

  private readonly indexedComponents: IndexedComponents<S>;
  private readonly indexedComponentValues: IndexedComponentValues<S>;
  private readonly indexedColors: IndexedColors<S>;

  constructor(definition: Definition) {
    this.definition = mask(definition, DefinitionStruct);

    this.indexedComponents = this.indexComponents();
    this.indexedComponentValues = this.indexComponentValues();
    this.indexedColors = this.indexColors();
  }

  getMetadata(): Exclude<DefinitionMetadata, undefined> {
    return this.definition.metadata ?? {};
  }

  getBody(): DefinitionBody {
    return this.definition.body;
  }

  getAttributes(): Exclude<DefinitionAttributeList, undefined> {
    return this.definition.attributes ?? [];
  }

  getComponents(): Exclude<DefinitionComponentList, undefined> {
    return this.definition.components ?? [];
  }

  getColors(): Exclude<DefinitionColorList, undefined> {
    return this.definition.colors ?? [];
  }

  getComponentByName(
    name: ComponentsFromStyleOptions<S> | string,
  ): DefinitionComponent | undefined {
    return this.indexedComponents.get(name);
  }

  getComponentValueByName(
    componentName: string,
    name: string,
  ): DefinitionComponentValue | undefined {
    return this.indexedComponentValues.get(componentName)?.get(name);
  }

  getColorByName(name: string): DefinitionColor | undefined {
    return this.indexedColors.get(name);
  }

  private indexComponents(): IndexedComponents<S> {
    return new Map(
      this.getComponents().map((component) => [component.name, component]),
    );
  }

  private indexComponentValues(): IndexedComponentValues<S> {
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

  private indexColors(): IndexedColors<S> {
    return new Map(this.getColors().map((color) => [color.name, color]));
  }
}
