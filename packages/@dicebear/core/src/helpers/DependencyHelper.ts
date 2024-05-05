import { Style } from '../Style.js';
import { PropertiesCollection } from '../collections/PropertiesCollection.js';
import type { Dependencies } from '../types.js';

export class DependencyHelper {
  static memoizedGetDependenciesFromSvg = new Map<string, Dependencies>();

  static getDependenciesFromSvg(svg: string): Dependencies {
    if (this.memoizedGetDependenciesFromSvg.has(svg)) {
      return this.memoizedGetDependenciesFromSvg.get(svg)!;
    }

    const dependencies: Dependencies = {
      components: new Set(),
      colors: new Set(),
    };

    const matches = svg.matchAll(/#(component|color)-([a-z0-9-]+)/gi);

    for (const match of matches) {
      if (match[1] === 'component') {
        dependencies.components.add(match[2]);
      } else if (match[1] === 'color') {
        dependencies.colors.add(match[2]);
      }
    }

    this.memoizedGetDependenciesFromSvg.set(svg, dependencies);

    return dependencies;
  }

  static getDependenciesFromProperties(
    style: Style,
    properties: PropertiesCollection,
  ): Dependencies {
    const bodyDependencies = this.getDependenciesFromSvg(
      style.getBody().content,
    );

    const dependencies: Dependencies = {
      components: new Set(bodyDependencies.components),
      colors: new Set(bodyDependencies.colors),
    };

    const unprocessed = [...bodyDependencies.components];

    while (unprocessed.length > 0) {
      const component = unprocessed.pop()!;
      const componentValue = properties.get(component);

      // May not be a string if hidden component.
      if (typeof componentValue !== 'string') {
        continue;
      }

      const componentValueDependencies = this.getDependenciesFromSvg(
        style.getComponentValueByName(component, componentValue)!.content,
      );

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
}
