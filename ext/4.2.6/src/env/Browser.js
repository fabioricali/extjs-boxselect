/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2016 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2016-10-05 03:40:31 (283b2cb229d1bac39381235a0217583b24341c69)
*/
/**
 * Provides useful information about the current browser.
 * Should not be manually instantiated unless for unit-testing; access the global instance
 * stored in {@link Ext#browser} instead. Example:
 *
 *     if (Ext.browser.is.IE) {
 *          // IE specific code here
 *     }
 *
 *     if (Ext.browser.is.WebKit) {
 *          // WebKit specific code here
 *     }
 *
 *     console.log("Version " + Ext.browser.version);
 *
 * For a full list of supported values, refer to: {@link Ext.env.Browser#is}
 */
Ext.define('Ext.env.Browser', {
    statics: {
        browserNames: {
            ie: 'IE',
            firefox: 'Firefox',
            safari: 'Safari',
            chrome: 'Chrome',
            opera: 'Opera',
            edge : 'Edge',
            other: 'Other'
        },
        engineNames: {
            webkit: 'WebKit',
            gecko: 'Gecko',
            presto: 'Presto',
            trident: 'Trident',
            other: 'Other'
        },
        enginePrefixes: {
            webkit: 'AppleWebKit/',
            gecko: 'Gecko/',
            presto: 'Presto/',
            trident: 'Trident/'
        },
        browserPrefixes: {
            ie: 'MSIE ',
            edge: 'Edge/',
            firefox: 'Firefox/',
            chrome: 'Chrome/',
            safari: 'Version/',
            opera: 'Opera/'
        }
    },

    /**
     * @property {Boolean} isSecure
     * True if the page is running over SSL
     */
    isSecure: false,

    /**
     * @property {Boolean} isStrict
     * True if the document is in strict mode
     */
    isStrict: false,

    /**
     * A "hybrid" property, can be either accessed as a method call, i.e:
     *
     *     if (Ext.browser.is('IE')) { ... }
     *
     * or as an object with boolean properties, i.e:
     *
     *     if (Ext.browser.is.IE) { ... }
     *
     * Versions can be conveniently checked as well. For example:
     *
     *     if (Ext.browser.is.IE6) { ... } // Equivalent to (Ext.browser.is.IE && Ext.browser.version.equals(6))
     *
     * Note that only {@link Ext.Version#getMajor major component}  and {@link Ext.Version#getShortVersion shortVersion}
     * value of the version are available via direct property checking.
     *
     * Supported values are: IE, Firefox, Safari, Chrome, Opera, WebKit, Gecko, Presto, Trident and Other
     *
     * @param {String} value The OS name to check
     * @return {Boolean}
     * @method
     */
    is: Ext.emptyFn,

    /**
     * @property {String} name
     * The full name of the current browser
     * Possible values are: IE, Firefox, Safari, Chrome, Opera and Other.
     * @readonly
     */
    name: null,

    /**
     * @property {Ext.Version} version
     * Refer to {@link Ext.Version}.
     * @readonly
     */
    version: null,

    /**
     * @property {String} engineName
     * The full name of the current browser's engine.
     * Possible values are: WebKit, Gecko, Presto, Trident and Other.
     * @readonly
     */
    engineName: null,

    /**
     * @property {String} engineVersion
     * Refer to {@link Ext.Version}.
     * @readonly
     */
    engineVersion: null,

    constructor: function() {
        var userAgent      = this.userAgent = Ext.global.navigator.userAgent,
            selfClass      = this.statics(),
            browserMatch   = userAgent.match(new RegExp('((?:' + Ext.Object.getValues(selfClass.browserPrefixes).join(')|(?:') + '))([\\d\\._]+)')),
            engineMatch    = userAgent.match(new RegExp('((?:' + Ext.Object.getValues(selfClass.enginePrefixes).join(')|(?:') + '))([\\d\\._]+)')),
            browserName    = selfClass.browserNames.other,
            browserVersion = '',
            engineName     = selfClass.engineNames.other,
            engineVersion  = '',
            key, value;

        this.is = function(name) {
            return this.is[name] === true;
        };

        // Edge has a userAgent with All browsers so we manage it separately
        // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240"
        if (/Edge\//.test(userAgent)) {
            browserMatch = userAgent.match(/(Edge\/)([\w.]+)/);
        }

        if (browserMatch) {
            browserName = selfClass.browserNames[Ext.Object.getKey(selfClass.browserPrefixes, browserMatch[1])];
            browserVersion = browserMatch[2];
        }

        if (engineMatch) {
            engineName = selfClass.engineNames[Ext.Object.getKey(selfClass.enginePrefixes, engineMatch[1])];
            engineVersion = engineMatch[2];
        }

        if (engineName === 'Trident' && browserName !== 'IE') {
            browserName = 'IE';
            var version = userAgent.match(/.*rv:(\d+.\d+)/);
            if (version && version.length) {
                version = version[1];
                browserVersion = new Ext.Version(version);
            }
        }

        Ext.apply(this, {
            engineName: engineName,
            engineVersion: new Ext.Version(engineVersion),
            name: browserName,
            version: new Ext.Version(browserVersion)
        });

        this.is[this.name] = true;
        this.is[this.name + (this.version.getMajor() || '')] = true;
        this.is[this.name + this.version.getShortVersion()] = true;

        for (key in selfClass.browserNames) {
            if (selfClass.browserNames.hasOwnProperty(key)) {
                value = selfClass.browserNames[key];
                this.is[value] = (this.name === value);
            }
        }

        this.is[this.name] = true;
        this.is[this.engineName + (this.engineVersion.getMajor() || '')] = true;
        this.is[this.engineName + this.engineVersion.getShortVersion()] = true;

        for (key in selfClass.engineNames) {
            if (selfClass.engineNames.hasOwnProperty(key)) {
                value = selfClass.engineNames[key];
                this.is[value] = (this.engineNames === value);
            }
        }

        this.isSecure = /^https/i.test(Ext.global.location.protocol);

        this.isStrict = Ext.global.document.compatMode === "CSS1Compat";

        return this;
    }

}, function() {

    /**
     * @property {Ext.env.Browser} browser
     * @member Ext
     * Global convenient instance of {@link Ext.env.Browser}.
     */
    Ext.browser = new Ext.env.Browser();

});
