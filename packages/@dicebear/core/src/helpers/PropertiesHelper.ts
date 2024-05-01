import { Builder } from '../Builder.js';
import { Prng } from '../Prng.js';
import { OptionsCollection } from '../collections/OptionsCollection.js';
import { ColorModel } from '../models/ColorModel.js';
import { ColorHelper } from './ColorHelper.js';
import { StringHelper } from './StringHelper.js';

export class PropertiesHelper {
  public static fillProperties(
    builder: Builder,
    options: OptionsCollection,
  ): void {
    const prng = Prng.fromSeed(options.get('seed') as string);

    PropertiesHelper.fillCoreProperties(builder, options, prng);
    PropertiesHelper.fillColorProperties(builder, options, prng);
    PropertiesHelper.fillComponentProperties(builder, options, prng);
  }

  public static fillCoreProperties(
    builder: Builder,
    options: OptionsCollection,
    prng: Prng,
  ): void {
    const properties = builder.getProperties();

    const seed = options.getString('seed');
    const size = options.getString('size');

    const backgroundColor = prng.pick(
      options.getArray('backgroundColor') as string[],
    );

    const backgroundColorModel = backgroundColor
      ? new ColorModel(backgroundColor)
      : null;

    properties.set('initials', StringHelper.getInitials(seed));
    properties.set('seed', seed);
    properties.set('flip', options.getBoolean('flip'));
    properties.set('rotate', options.getNumber('rotate'));
    properties.set('scale', options.getNumber('scale'));
    properties.set('radius', options.getNumber('radius'));
    properties.set('size', typeof size === 'number' ? size : null);
    properties.set('backgroundColor', backgroundColorModel);
    properties.set('translateX', options.getNumber('translateX'));
    properties.set('translateY', options.getNumber('translateY'));
    properties.set('clip', options.getBoolean('clip'));
    properties.set('randomizeIds', options.getBoolean('randomizeIds'));
  }

  public static fillColorProperties(
    builder: Builder,
    options: OptionsCollection,
    prng: Prng,
  ): void {
    const style = builder.getStyle();
    const properties = builder.getProperties();

    for (const color of style.getColors()) {
      const propertyKey = `${color.name}Color`;

      if (properties.has(propertyKey)) {
        // Ignore colors that are already set. `backgroundColor` for example is
        // filled in `fillCoreProperties`
        continue;
      }

      const optionValue = options.getArray(`${color.name}Color`) as string[];

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

  public static fillComponentProperties(
    builder: Builder,
    options: OptionsCollection,
    prng: Prng,
  ): void {
    const style = builder.getStyle();
    const properties = builder.getProperties();

    for (const component of style.getComponents()) {
      const componentValueNameOption = options.getArray(
        component.name,
      ) as string[];

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
