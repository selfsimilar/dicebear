import type { Definition } from '../types';
import { BuildModel } from '../models/BuildModel';
import { ColorModel } from '../models/ColorModel';
import { ColorHelper } from './ColorHelper';
import { StringHelper } from './StringHelper';

export class PropertiesHelper {
  public static fillProperties<O extends Record<string, unknown>>(
    buildModel: BuildModel<O>,
    definition: Definition,
  ): void {
    PropertiesHelper.fillCoreProperties(buildModel);
    PropertiesHelper.fillColorProperties(buildModel, definition);
    PropertiesHelper.fillComponentProperties(buildModel, definition);
  }

  public static fillCoreProperties<O extends Record<string, unknown>>(
    buildModel: BuildModel<O>,
  ): void {
    const prng = buildModel.getPrng();
    const options = buildModel.getOptions();
    const properties = buildModel.getProperties();

    const backgroundColor = prng.pick(options.backgroundColor);
    const backgroundColorModel = backgroundColor
      ? new ColorModel(backgroundColor)
      : null;

    properties.set('initials', StringHelper.getInitials(options.seed));
    properties.set('seed', options.seed);
    properties.set('flip', options.flip);
    properties.set('rotate', options.rotate);
    properties.set('scale', options.scale);
    properties.set('radius', options.radius ?? 0);
    properties.set('size', options.size ?? null);
    properties.set('backgroundColor', backgroundColorModel);
    properties.set('translateX', options.translateX);
    properties.set('translateY', options.translateY);
    properties.set('clip', options.clip);
    properties.set('randomizeIds', options.randomizeIds);
  }

  public static fillColorProperties<O extends Record<string, unknown>>(
    buildModel: BuildModel<O>,
    definition: Definition,
  ): void {
    const properties = buildModel.getProperties();
    const options = buildModel.getOptions();
    const prng = buildModel.getPrng();

    for (const color of definition.colors ?? []) {
      const propertyKey = `${color.name}Color`;

      if (properties.has(propertyKey)) {
        // Ignore colors that are already set. `backgroundColor` for example is
        // filled in `fillCoreProperties`
        continue;
      }

      const optionValue = options[`${color.name}Color`] as string[];

      let availableColors = optionValue.map((c) => new ColorModel(c));

      if (color.notEqualTo) {
        const notEqualTo = properties.get(`${color.notEqualTo}Color`);

        if (notEqualTo instanceof ColorModel) {
          const newAvailableColors = availableColors.filter(
            (color) => notEqualTo.getHex() === color.getHex(),
          );

          if (newAvailableColors.length > 0) {
            availableColors = newAvailableColors;
          }
        }
      }

      if (color.contrastTo) {
        const contrastTo = properties.get(`${color.contrastTo}Color`);

        if (contrastTo instanceof ColorModel) {
          const colorValue = ColorHelper.getContrastColor(
            contrastTo,
            availableColors,
          );

          if (colorValue) {
            availableColors = [colorValue];
          }
        }
      }

      properties.set(propertyKey, prng.pick(availableColors, null));
    }
  }

  public static fillComponentProperties<O extends Record<string, unknown>>(
    buildModel: BuildModel<O>,
    definition: Definition,
  ): void {
    const properties = buildModel.getProperties();
    const options = buildModel.getOptions();
    const prng = buildModel.getPrng();

    for (const component of definition.components ?? []) {
      const componentValueNameOption = options[component.name] as string[];
      const componentValueName = prng.pick(componentValueNameOption);
      const componentVisible = prng.bool(component.probability);

      properties.set(
        component.name,
        componentVisible && componentValueName ? componentValueName : null,
      );

      properties.set(
        `${component.name}Probability`,
        componentVisible ? 100 : 0,
      );

      if (component.rotation !== undefined) {
        properties.set(
          `${component.name}Rotation`,
          prng.integer(
            Math.min(...component.rotation),
            Math.max(...component.rotation),
          ),
        );
      }

      if (component.offset?.x !== undefined) {
        properties.set(
          `${component.name}OffsetX`,
          prng.integer(
            Math.min(...component.offset.x),
            Math.max(...component.offset.x),
          ),
        );
      }

      if (component.offset?.y !== undefined) {
        properties.set(
          `${component.name}OffsetY`,
          prng.integer(
            Math.min(...component.offset.y),
            Math.max(...component.offset.y),
          ),
        );
      }
    }
  }
}
