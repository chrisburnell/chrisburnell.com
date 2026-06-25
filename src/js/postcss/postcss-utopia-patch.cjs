const CSSValueParser = require('postcss-value-parser')
const { calculateClamp, calculateClamps, calculateSpaceScale, calculateTypeScale } = require('utopia-core');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts) => {

  const DEFAULTS = { minWidth: 320, maxWidth: 1240, minFontSize: 16, maxFontSize: 20, relativeTo: 'viewport' }
  const config = Object.assign(DEFAULTS, opts)

  const typeScale = (atRule, result) => {
    const { nodes } = CSSValueParser(atRule.params);
    const params = nodes[0].nodes.filter(x => ['word', 'string'].includes(x.type) && x.value !== '{' && x.value !== '}');

    const typeParams = {
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      minFontSize: 16,
      maxFontSize: 16,
      minTypeScale: 1.1,
      maxTypeScale: 1.1,
      positiveSteps: 0,
      negativeSteps: 0,
      relativeTo: config.relativeTo,
      prefix: 'step',
    };
    const paramKeys = Object.keys(typeParams);

    if (!params.length) {
      atRule.remove();
      return false;
    }

    for (let index = 0; index < params.length; index = index + 2) {
      const element = params[index];
      const key = element.value;
      const value = params[index + 1];
      if (!key || value === undefined) continue;

      if (paramKeys.includes(key)) {
        typeParams[key] = isNaN(typeParams[key]) ? value.value : Number(value.value);
      }
    }

    const typeScale = calculateTypeScale(typeParams);
    const response = `${typeScale.map(step => {
      return `--${typeParams.prefix || 'step'}-${step.step}: ${step.clamp};`
    }).join('\n')}`

    typeScale.some(step => {
      if (step.wcagViolation) {
        atRule.warn(
          result,
          `WCAG SC 1.4.4 violation for viewports ${step.wcagViolation.from}px to ${step.wcagViolation.to}px.`
        );
        return true;
      }
      return false;
    });

    atRule.replaceWith(response);

    return false;
  }

  const spaceScale = (atRule) => {
    const { nodes } = CSSValueParser(atRule.params);
    const params = nodes[0].nodes.filter(x => ['word', 'string'].includes(x.type) && x.value !== '{' && x.value !== '}');

    if (!params.length) {
      atRule.remove();
      return false;
    }

    const spaceParams = {
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      minSize: 16,
      maxSize: 16,
      positiveSteps: [],
      negativeSteps: [],
      customSizes: [],
      relativeTo: 'viewport',
      usePx: false,
      prefix: 'space'
    };
    const paramKeys = Object.keys(spaceParams);
    const arrayParams = ['positiveSteps', 'negativeSteps', 'customSizes'];
    const keyParams = paramKeys.filter(x => !arrayParams.includes(x));

    keyParams.forEach(param => {
      const index = params.findIndex(x => x.value === param);
      if (index !== -1 && params[index + 1] !== undefined) {
        if (['minWidth', 'maxWidth', 'minSize', 'maxSize'].includes(param)) {
          spaceParams[param] = Number(params[index + 1].value);
        } else if ('usePx' === param) {
          spaceParams[param] = params[index + 1].value === 'true';
        } else {
          spaceParams[param] = params[index + 1].value;
        }

        params.splice(index, 2);
      }
    });

    const remainingParams = params.map(x => x.value.replace('[', '').replace(']', '')).filter(x => x !== '');
    let runningKey = '';
    remainingParams.forEach(val => {
      if (arrayParams.includes(val)) {
        runningKey = val;
      } else {
        spaceParams[runningKey].push(runningKey === 'customSizes' ? val : Number(val));
      }
    });

    const spaceScale = calculateSpaceScale(spaceParams);

    const response = `${[...spaceScale.sizes, ...spaceScale.oneUpPairs, ...spaceScale.customPairs].map(step => {
      return `--${spaceParams.prefix || 'space'}-${step.label}: ${spaceParams.usePx ? step.clampPx : step.clamp};`
    }).join('\n')}`

    atRule.replaceWith(response);

    return false;
  }

  const clamps = (atRule) => {
    const { nodes } = CSSValueParser(atRule.params);
    const params = nodes[0].nodes.filter(x => ['word', 'string'].includes(x.type) && x.value !== '{' && x.value !== '}');

    if (!params.length) {
      atRule.remove();
      return false;
    }

    const clampsParams = {
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      pairs: [],
      relativeTo: 'viewport',
      prefix: 'space',
      usePx: false
    };
    const paramKeys = Object.keys(clampsParams);
    const arrayParams = ['pairs'];
    const keyParams = paramKeys.filter(x => !arrayParams.includes(x));

    keyParams.forEach(param => {
      const index = params.findIndex(x => x.value === param);
      if (index !== -1 && params[index + 1] !== undefined) {
        if (['minWidth', 'maxWidth'].includes(param)) {
          clampsParams[param] = Number(params[index + 1].value);
        } else if ('usePx' === param) {
          clampsParams[param] = params[index + 1].value === 'true';
        } else {
          clampsParams[param] = params[index + 1].value;
        }

        params.splice(index, 2);
      }
    });

    const remainingParams = params.map(x => x.value.replaceAll('[', '').replaceAll(']', '')).filter(x => x !== '');
    let runningKey = '';
    remainingParams.forEach(val => {
      if (arrayParams.includes(val)) {
        runningKey = val;
      } else {
        clampsParams[runningKey].push(Number(val));
      }
    });

    clampsParams.pairs = clampsParams.pairs.reduce(function (pairs, value, index, array) {
      if (index % 2 === 0)
      pairs.push(array.slice(index, index + 2));
      return pairs;
    }, []);

    const clampScale = calculateClamps(clampsParams);
    const response = `${clampScale.map(step => {
      return `--${clampsParams.prefix || 'space'}-${step.label}: ${clampsParams.usePx ? step.clampPx : step.clamp};`
    }).join('\n')}`;

    atRule.replaceWith(response);

    return false;
  }

  return {
    postcssPlugin: 'utopia',

    AtRule: {
      utopia: (atRule, { result }) => {
        if (atRule.params.startsWith('typeScale(')) {
          return typeScale(atRule, result);
        }

        if (atRule.params.startsWith('spaceScale(')) {
          return spaceScale(atRule);
        }

        if (atRule.params.startsWith('clamps(')) {
          return clamps(atRule);
        }
      }
    },

    Declaration(decl) {
      // The faster way to find Declaration node
      const parsedValue = CSSValueParser(decl.value)

      let valueChanged = false
      parsedValue.walk(node => {
        if (node.type !== 'function' || node.value !== 'utopia.clamp') {
          return
        }

        const allValues = node.nodes.filter(x => ['word', 'string'].includes(x.type)).map(x => x.value)
        const lastValue = allValues[allValues.length - 1];

        const hasRelativeTo = isNaN(Number(lastValue)) && allValues.length >= 1;
        const relativeTo = hasRelativeTo ? lastValue : config.relativeTo;

        const numericValues = hasRelativeTo ? allValues.slice(0, -1) : allValues;

        let [minSize, maxSize, minWidth, maxWidth] = numericValues.map(Number);
        if (!minWidth) minWidth = config.minWidth;
        if (!maxWidth) maxWidth = config.maxWidth;

        if (!minSize || !maxSize || !minWidth || !maxWidth) return false;

        // Generate clamp
        const clamp = calculateClamp({ minSize, maxSize, minWidth, maxWidth, relativeTo });

        // Convert back PostCSS nodes
        const { nodes: [{ nodes }] } = CSSValueParser(clamp);

        node.value = 'clamp';
        node.nodes = nodes;
        valueChanged = true

        return false
      })

      if (valueChanged) {
        decl.value = CSSValueParser.stringify(parsedValue)
      }

    }
  }
}

module.exports.postcss = true
