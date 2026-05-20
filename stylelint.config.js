const config = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-css-modules',
    ],

    rules: {
        'selector-class-pattern': null,
        'no-empty-source': null,
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
    },
};

export default config;