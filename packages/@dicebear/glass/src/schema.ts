/**
 * Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
 *
 * Plugin: https://www.figma.com/community/plugin/1005765655729342787
 * File: https://www.figma.com/design/MbbQiNEkuiiLZSbZuPzyVD
 */

import type { StyleSchema } from '@dicebear/core';

export const schema: StyleSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "backgroundColor": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^(transparent|[a-fA-F0-9]{6})$"
      },
      "default": [
        "be4444",
        "be7044",
        "beb244",
        "64be44",
        "448bbe",
        "4450be",
        "8144be",
        "be44b2",
        "44bea1"
      ]
    },
    "shape1": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "d",
          "i",
          "c",
          "e",
          "b",
          "a",
          "r"
        ]
      },
      "default": [
        "d",
        "i",
        "c",
        "e",
        "b",
        "a",
        "r"
      ]
    },
    "shape1OffsetX": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": -100,
        "maximum": 100
      },
      "maxItems": 2,
      "default": [
        -100,
        100
      ]
    },
    "shape1OffsetY": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": -100,
        "maximum": 100
      },
      "maxItems": 2,
      "default": [
        -100,
        100
      ]
    },
    "shape1Rotation": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": -180,
        "maximum": 180
      },
      "maxItems": 2,
      "default": [
        -180,
        180
      ]
    },
    "shape2": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "d",
          "i",
          "c",
          "e",
          "b",
          "a",
          "r"
        ]
      },
      "default": [
        "d",
        "i",
        "c",
        "e",
        "b",
        "a",
        "r"
      ]
    },
    "shape2OffsetX": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": -100,
        "maximum": 100
      },
      "maxItems": 2,
      "default": [
        -100,
        100
      ]
    },
    "shape2OffsetY": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": -100,
        "maximum": 100
      },
      "maxItems": 2,
      "default": [
        -100,
        100
      ]
    },
    "shape2Rotation": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": -160,
        "maximum": 160
      },
      "maxItems": 2,
      "default": [
        -160,
        160
      ]
    }
  }
};
