import { mask } from 'superstruct';
import { DefinitionStruct } from './structs/DefinitionStruct';
import {
  ComponentsFromStyleOptions,
  Definition,
  DefinitionAttributeList,
  DefinitionBody,
  DefinitionColorList,
  DefinitionComponentList,
  DefinitionComponentValue,
  DefinitionMetadata,
  StyleOptions,
} from './types';

type IndexedComponentValues<S extends StyleOptions> = Map<
  ComponentsFromStyleOptions<S> | string,
  Map<string, DefinitionComponentValue>
>;

export class Style<S extends StyleOptions = StyleOptions> {
  private readonly definition: Definition;

  private readonly indexedComponentValues: IndexedComponentValues<S>;

  constructor(definition: Definition) {
    this.definition = mask(definition, DefinitionStruct);

    this.indexedComponentValues = this.indexComponentValues();
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

  getComponentValueByName(
    componentName: ComponentsFromStyleOptions<S> | string,
    name: string,
  ): DefinitionComponentValue | undefined {
    return this.indexedComponentValues.get(componentName)?.get(name);
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
}
