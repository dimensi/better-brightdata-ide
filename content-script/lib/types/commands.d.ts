/**
 * Global object available to the interaction code. Provided by trigger input or next_stage() calls
 *
 * @example:
 ```
 navigate(input.url);
 ```
 */
declare function input(): void;

/**
 * View pages as a mobile device. This command will change user agent and screen parameters (resolution and device pixel ratio)
 * @param device A string with the name of device.
 * @example:
 ```
 emulate_device('iPhone X');
 ```
 * @example:
 ```
 emulate_device('Pixel 2');
 ```
 */
declare function emulate_device(
  device:
    | "Blackberry PlayBook"
    | "Blackberry PlayBook landscape"
    | "BlackBerry Z30"
    | "BlackBerry Z30 landscape"
    | "Galaxy Note 3"
    | "Galaxy Note 3 landscape"
    | "Galaxy Note II"
    | "Galaxy Note II landscape"
    | "Galaxy S III"
    | "Galaxy S III landscape"
    | "Galaxy S5"
    | "Galaxy S5 landscape"
    | "Galaxy S8"
    | "Galaxy S8 landscape"
    | "Galaxy S9+"
    | "Galaxy S9+ landscape"
    | "Galaxy Tab S4"
    | "Galaxy Tab S4 landscape"
    | "iPad"
    | "iPad landscape"
    | "iPad (gen 6)"
    | "iPad (gen 6) landscape"
    | "iPad (gen 7)"
    | "iPad (gen 7) landscape"
    | "iPad Mini"
    | "iPad Mini landscape"
    | "iPad Pro"
    | "iPad Pro landscape"
    | "iPad Pro 11"
    | "iPad Pro 11 landscape"
    | "iPhone 4"
    | "iPhone 4 landscape"
    | "iPhone 5"
    | "iPhone 5 landscape"
    | "iPhone 6"
    | "iPhone 6 landscape"
    | "iPhone 6 Plus"
    | "iPhone 6 Plus landscape"
    | "iPhone 7"
    | "iPhone 7 landscape"
    | "iPhone 7 Plus"
    | "iPhone 7 Plus landscape"
    | "iPhone 8"
    | "iPhone 8 landscape"
    | "iPhone 8 Plus"
    | "iPhone 8 Plus landscape"
    | "iPhone SE"
    | "iPhone SE landscape"
    | "iPhone X"
    | "iPhone X landscape"
    | "iPhone XR"
    | "iPhone XR landscape"
    | "iPhone 11"
    | "iPhone 11 landscape"
    | "iPhone 11 Pro"
    | "iPhone 11 Pro landscape"
    | "iPhone 11 Pro Max"
    | "iPhone 11 Pro Max landscape"
    | "iPhone 12"
    | "iPhone 12 landscape"
    | "iPhone 12 Pro"
    | "iPhone 12 Pro landscape"
    | "iPhone 12 Pro Max"
    | "iPhone 12 Pro Max landscape"
    | "iPhone 12 Mini"
    | "iPhone 12 Mini landscape"
    | "iPhone 13"
    | "iPhone 13 landscape"
    | "iPhone 13 Pro"
    | "iPhone 13 Pro landscape"
    | "iPhone 13 Pro Max"
    | "iPhone 13 Pro Max landscape"
    | "iPhone 13 Mini"
    | "iPhone 13 Mini landscape"
    | "JioPhone 2"
    | "JioPhone 2 landscape"
    | "Kindle Fire HDX"
    | "Kindle Fire HDX landscape"
    | "LG Optimus L70"
    | "LG Optimus L70 landscape"
    | "Microsoft Lumia 550"
    | "Microsoft Lumia 950"
    | "Microsoft Lumia 950 landscape"
    | "Nexus 10"
    | "Nexus 10 landscape"
    | "Nexus 4"
    | "Nexus 4 landscape"
    | "Nexus 5"
    | "Nexus 5 landscape"
    | "Nexus 5X"
    | "Nexus 5X landscape"
    | "Nexus 6"
    | "Nexus 6 landscape"
    | "Nexus 6P"
    | "Nexus 6P landscape"
    | "Nexus 7"
    | "Nexus 7 landscape"
    | "Nokia Lumia 520"
    | "Nokia Lumia 520 landscape"
    | "Nokia N9"
    | "Nokia N9 landscape"
    | "Pixel 2"
    | "Pixel 2 landscape"
    | "Pixel 2 XL"
    | "Pixel 2 XL landscape"
    | "Pixel 3"
    | "Pixel 3 landscape"
    | "Pixel 4"
    | "Pixel 4 landscape"
    | "Pixel 4a (5G)"
    | "Pixel 4a (5G) landscape"
    | "Pixel 5"
    | "Pixel 5 landscape"
    | "Moto G4"
    | "Moto G4 landscape"
): void;

/**
 * Returns current browser window size
 */
declare function browser_size(): void;

/**
 * Detects a block on the page
 * @param resource An object specifying the resource required for the detection
 * @param condition An object specifying how the resource should be processed for detection
 * @example:
 ```
 detect_block({selector: '.foo'}, {exists: true});
 ```
 * @example:
 ```
 detect_block({selector: '.bar'}, {has_text: 'text'});
 ```
 * @example:
 ```
 detect_block({selector: '.baz'}, {has_text: /regex_pattern/});
 ```
 */
declare function detect_block(
  resource: { selector: string },
  condition: { has_text?: RegExp | string; exists?: boolean }
): void;

/**
 * Navigate the browser to a URL.
 A 404 status code will throw a dead_page error by default. Use opt.allow_status to override this.
 * @param url A URL to navigate to
 * @param opt navigate options (see examples)
 * @example:
 ```
 navigate(<url>);
 ```
 * @example:
 ```
 navigate(input.url);
 ```
 * @example:
 ```
 navigate('https://example.com');
 ```
 * @example:
 ```
 navigate(<url>, {wait_until: 'domcontentloaded'}); // waits until DOM content loaded event is fired in the browser
 ```
 * @example:
 ```
 navigate(<url>, {referer: <url>}); // adds a referer to the navigation
 ```
 * @example:
 ```
 navigate(<url>, {timeout: 45000}); // the number of milliseconds to wait for. Default is 30000 ms
 ```
 * @example:
 ```
 // Specify browser width/height
 navigate(<url>, {
    fingerprint: {screen: {width: 400, height: 400}},
});
 ```
 */
declare function navigate(
  url: string,
  opt?: {
    wait_until?: "navigate" | "domcontentloaded";
    referer?: string;
    timeout?: number;
    fingerprint?: { screen: { width: number; height: number } };
  }
): void;

/**
 * Parse the page data
 *
 * @example:
 ```
 let page_data = parse();
 collect({
    title: page_data.title,
    price: page_data.price,
});
 ```
 */
declare function parse(): Record<string, any>;

/**
 * An array of lines to add to your dataset at the end of this page crawl.
 Each call to set_lines() will override previous ones, and only the last set of lines will be added into the dataset (tracked per page crawl).
 This is a good fit when the collector is set to collect partial on errors. You can keep calling set_lines() with the data you gathered so far, and the last call will be used if the page crawl throws an error
 * @param lines An array of data lines to add to your final dataset
 * @param validate_fn Optional function to check that the line data is valid (run once per line)
 * @example:
 ```
 set_lines(<data_line>[, <validate_fn>]);
 ```
 * @example:
 ```
 set_lines(products_so_far);
 ```
 * @example:
 ```
 set_lines(products_so_far, i=>{
    if (!i.price)
        throw new Error('Missing price');
});
 ```
 */
declare function set_lines(
  lines: Array<Record<string, unknown>>,
  validate_fn: (obj: Record<string, unknown>) => boolean
): void;

/**
 * Run the next stage of the crawler with the specified input
 * @param input Input object to pass to the next browser session
 * @example:
 ```
 next_stage({url: 'http://example.com', page: 1});
 ```
 */
declare function next_stage(input: Record<string, unknown>): void;

/**
 * Run this stage of the crawler again with new input
 * @param input Input object to pass to the next browser session
 * @example:
 ```
 rerun_stage({url: 'http://example.com/other-page'});
 ```
 */
declare function rerun_stage(input: Record<string, unknown>): void;

/**
 * Run a specific stage of the crawler with a new browser session
 * @param stage Which stage to run (1 is first stage)
 * @param input Input object to pass to the next browser session
 * @example:
 ```
 run_stage(2, {url: 'http://example.com', page: 1});
 ```
 */
declare function run_stage(stage: number, input: Record<string, unknown>): void;

type CountryCode =
  | "af"
  | "al"
  | "dz"
  | "as"
  | "ad"
  | "ao"
  | "ai"
  | "aq"
  | "ag"
  | "ar"
  | "am"
  | "aw"
  | "au"
  | "at"
  | "az"
  | "bs"
  | "bh"
  | "bd"
  | "bb"
  | "by"
  | "be"
  | "bz"
  | "bj"
  | "bm"
  | "bt"
  | "bo"
  | "bq"
  | "ba"
  | "bw"
  | "bv"
  | "br"
  | "io"
  | "bn"
  | "bg"
  | "bf"
  | "bi"
  | "cv"
  | "kh"
  | "cm"
  | "ca"
  | "ky"
  | "cf"
  | "td"
  | "cl"
  | "cn"
  | "cx"
  | "cc"
  | "co"
  | "km"
  | "cd"
  | "cg"
  | "ck"
  | "cr"
  | "hr"
  | "cu"
  | "cw"
  | "cy"
  | "cz"
  | "ci"
  | "dk"
  | "dj"
  | "dm"
  | "do"
  | "ec"
  | "eg"
  | "sv"
  | "gq"
  | "er"
  | "ee"
  | "sz"
  | "et"
  | "fk"
  | "fo"
  | "fj"
  | "fi"
  | "fr"
  | "gf"
  | "pf"
  | "tf"
  | "ga"
  | "gm"
  | "ge"
  | "de"
  | "gh"
  | "gi"
  | "gr"
  | "gl"
  | "gd"
  | "gp"
  | "gu"
  | "gt"
  | "gg"
  | "gn"
  | "gw"
  | "gy"
  | "ht"
  | "hm"
  | "va"
  | "hn"
  | "hk"
  | "hu"
  | "is"
  | "in"
  | "id"
  | "ir"
  | "iq"
  | "ie"
  | "im"
  | "il"
  | "it"
  | "jm"
  | "jp"
  | "je"
  | "jo"
  | "kz"
  | "ke"
  | "ki"
  | "kp"
  | "kr"
  | "kw"
  | "kg"
  | "la"
  | "lv"
  | "lb"
  | "ls"
  | "lr"
  | "ly"
  | "li"
  | "lt"
  | "lu"
  | "mo"
  | "mg"
  | "mw"
  | "my"
  | "mv"
  | "ml"
  | "mt"
  | "mh"
  | "mq"
  | "mr"
  | "mu"
  | "yt"
  | "mx"
  | "fm"
  | "md"
  | "mc"
  | "mn"
  | "me"
  | "ms"
  | "ma"
  | "mz"
  | "mm"
  | "na"
  | "nr"
  | "np"
  | "nl"
  | "nc"
  | "nz"
  | "ni"
  | "ne"
  | "ng"
  | "nu"
  | "nf"
  | "mp"
  | "no"
  | "om"
  | "pk"
  | "pw"
  | "ps"
  | "pa"
  | "pg"
  | "py"
  | "pe"
  | "ph"
  | "pn"
  | "pl"
  | "pt"
  | "pr"
  | "qa"
  | "mk"
  | "ro"
  | "ru"
  | "rw"
  | "re"
  | "bl"
  | "sh"
  | "kn"
  | "lc"
  | "mf"
  | "pm"
  | "vc"
  | "ws"
  | "sm"
  | "st"
  | "sa"
  | "sn"
  | "rs"
  | "sc"
  | "sl"
  | "sg"
  | "sx"
  | "sk"
  | "si"
  | "sb"
  | "so"
  | "za"
  | "gs"
  | "ss"
  | "es"
  | "lk"
  | "sd"
  | "sr"
  | "sj"
  | "se"
  | "ch"
  | "sy"
  | "tw"
  | "tj"
  | "tz"
  | "th"
  | "tl"
  | "tg"
  | "tk"
  | "to"
  | "tt"
  | "tn"
  | "tr"
  | "tm"
  | "tc"
  | "tv"
  | "ug"
  | "ua"
  | "ae"
  | "gb"
  | "um"
  | "us"
  | "uy"
  | "uz"
  | "vu"
  | "ve"
  | "vn"
  | "vg"
  | "vi"
  | "wf"
  | "eh"
  | "ye"
  | "zm"
  | "zw"
  | "ax";
/**
 * Configure your crawl to run from a specific country
 * @param code 2-character ISO country code
 * @example:
 ```
 country(<code>);
 ```
 * @example:
 ```
 country('us');
 ```
 */
declare function country(code: CountryCode): void;

/**
 * Configure your crawl to run from a specific location. Unless you need high resolution control over where your crawl is running from, you probably want to use `country(code)` instead
 * @deprecated
 * @param configuration Object with a desired proxy location, check examples for more info
 * @example:
 ```
 proxy_location({country: 'us'});
 ```
 * @example:
 ```
 proxy_location({lat: 37.7749, long: 122.4194}); // lat in range: [-85, 85], long in range: [-180, 180]
 ```
 * @example:
 ```
 proxy_location({lat: 37.7749, long: 122.4194, country: 'US', radius: 100}); // radius in km
 ```
 */
declare function proxy_location(configuration: Record<string, unknown>): void;

/**
 * Preserve proxy session across children of this page
 *
 * @example:
 ```
 preserve_proxy_session();
 ```
 */
declare function preserve_proxy_session(): void;

/**
 * Mark a page as a dead link so you can filter it from your future collections (error_code=dead_page)
 * @param message A specific error message
 * @example:
 ```
 dead_page();
 ```
 * @example:
 ```
 dead_page('Product was removed');
 ```
 */
declare function dead_page(message: string): void;

/**
 * Mark the collector input as bad. Will prevent any crawl retries (error_code=bad_input)
 *
 * @example:
 ```
 bad_input();
 ```
 * @example:
 ```
 bad_input('Missing search term');
 ```
 */
declare function bad_input(message?: string): void;

/**
 * Mark the page as failed because of the website refusing access (error_code=blocked)
 *
 * @example:
 ```
 blocked();
 ```
 * @example:
 ```
 blocked('Login page was shown');
 ```
 */
declare function blocked(message?: string): void;

/**
 * Wait for an element to appear on the page
 * @param selector Element selector
 * @param opt wait options (see examples)
 * @example:
 ```
 wait(<selector>);
 ```
 * @example:
 ```
 wait('#welcome-splash');
 ```
 * @example:
 ```
 wait('.search-results .product');
 ```
 * @example:
 ```
 wait('[href^="/product"]');
 ```
 * @example:
 ```
 wait(<selector>, {timeout: 5000}); // the number of milliseconds to wait for. Default is 30000 ms
 ```
 * @example:
 ```
 wait(<selector>, {hidden: true}); // wait for element to be hidden
 ```
 * @example:
 ```
 wait(<selector>, {inside: '#iframe_id'}); // wait for element inside in an iframe
 ```
 */
declare function wait(
  selector: string,
  opt?: Partial<{ inside: string; hidden: boolean; timeout: number }>
): void;

/**
 * Wait for an element to be visible on the page
 * @param selector Element selector
 * @param [opts]
 * @example:
 ```
 wait_visible(<selector>);
 ```
 * @example:
 ```
 wait_visible('#welcome-splash');
 ```
 * @example:
 ```
 wait_visible(<selector>, {timeout: 5000});
 ```
 */
declare function wait_visible(
  selector: string,
  opts?: { timeout?: number }
): void;

/**
 * Wait for an element to not be visible on the page (removed or hidden)
 * @param selector Element selector
 * @param [opts]
 * @example:
 ```
 wait_hidden(<selector>);
 ```
 * @example:
 ```
 wait_hidden('#welcome-splash');
 ```
 * @example:
 ```
 wait_hidden(<selector>, {timeout: 5000});
 ```
 */
declare function wait_hidden(
  selector: string,
  opts?: { timeout: number }
): void;

/**
 * Monitor failed requests with a callback function
 * @param callback A function which will be called on each failed request with an object in format: {url, error, type, response}
 * @example:
 ```
 verify_requests(({url, error, type, response})=>{
    if (response.status!=404 && type=='Font')
        throw new Error('Font failed to load');
});
 ```
 */
declare function verify_requests(callback: {
  url: string;
  error: any;
  type: string;
  response: any;
}): void;

/**
 * Set extra headers for all the HTTP requests
 * @param headers Object with extra headers in key-value format
 * @example:
 ```
 set_session_headers({'HEADER_NAME': 'HEADER_VALUE'});
 ```
 */
declare function set_session_headers(headers: Record<string, string>): void;

/**
 * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist
 * @param domain Cookie domain
 * @param name Cookie name
 * @param value Cookie value
 * @example:
 ```
 set_session_cookie(<domain>, <name>, <value>);
 ```
 */
declare function set_session_cookie(
  domain: Record<string, unknown>,
  name: Record<string, unknown>,
  value: Record<string, unknown>
): void;

/**
 * Wait the browser network has been idle for a given time
 * @param options.timeout Wait for browser network to be idle for X milliseconds
 * @param options.ignore ignore: an array of patterns to exclude requests from monitoring
 timeout: how long the network needs to be idle in milliseconds (default 500)
 * @example:
 ```
 wait_network_idle();
 ```
 * @example:
 ```
 wait_network_idle({
    timeout: 1e3,
    ignore: [/long_request/, 'https://example.com'],
});
 ```
 */
declare function wait_network_idle(options?: {
  timeout: number;
  ignore: Array<RegExp | string>;
}): void;

/**
 * Wait until no changes are being made on the DOM tree for a given time
 * @param options.idle_timeout Milliseconds to wait for no changes
 * @param options.ignore An object, which can accept a ignore argument to exclude some elements from monitoring
 * @example:
 ```
 wait_page_idle();
 ```
 * @example:
 ```
 wait_page_idle({
    ignore: [<selector1>, <selector2>],
    idle_timeout: 1000,
});
 ```
 */
declare function wait_page_idle(options?: {
  idle_timeout?: number;
  ignore?: Array<string>;
}): void;

/**
 * Force the page to stop making changes. This can be used to save the page in a particular state so page snapshots that run after crawl won't see a different page state than you see now. This command is experimental. If you see problems, please report them to support
 *
 * @example:
 ```
 freeze_page();
 ```
 */
declare function freeze_page(): void;

/**
 * Start tracking the event listeners that the browser creates. It's needed to run disable_event_listeners() later
 *
 * @example:
 ```
 track_event_listeners();
 ```
 */
declare function track_event_listeners(): void;

/**
 * Stop all event listeners on the page from running. track_event_listeners() must have been called first
 * @param event_types Specific event types that should be disabled
 * @example:
 ```
 disable_event_listeners();
 ```
 * @example:
 ```
 disable_event_listeners(['hover', 'click']);
 ```
 */
declare function disable_event_listeners(event_types: string[]): void;

/**
 * Wait for an element on the page to include some text
 * @param selector Element selector
 * @param text The text to wait for
 * @example:
 ```
 wait_for_text(<selector>, <text>);
 ```
 * @example:
 ```
 wait_for_text('.location', 'New York');
 ```
 */
declare function wait_for_text(selector: string, text: string): void;

/**
 * Wait for a parser field to contain a value. This can be useful after you click something to wait for some data to appear
 * @param field The parser value path to wait on
 * @param [validate_fn] An optional callback function to validate that the value is correct
 * @param [opt] Extra options (e.g. timeout)
 * @example:
 ```
 wait_for_parser_value(<field>[, <validate_fn>][, opt]);
 ```
 * @example:
 ```
 wait_for_parser_value('profile');
 ```
 * @example:
 ```
 wait_for_parser_value('listings.0.price', v=>{
            return parseInt(v)>0;
        }, {timeout: 5000});
 ```
 */
declare function wait_for_parser_value(
  field: string,
  validate_fn?: (v: any) => boolean,
  opt?: Partial<{ timeout: number }>
): void;

/**
 * Click on an element (will wait for the element to appear before clicking on it)
 * @param selector Element selector
 * @example:
 ```
 click(<selector>);
 ```
 * @example:
 ```
 click('#show-more');
 ```
 * @example:
 ```
 $('#show-more').click()
 ```
 * @example:
 ```
 // Click the closest match to the passed coordinates
 // (relative to the page).
 // For example, clicking the center pin in a map
 let box = bounding_box('#map')
 let center = {x: (box.left+box.right)/2, y: (box.top+box.bottom)/2};
 click('.map-pin', {coordinates: center});
 ```
 */
declare function click(selector: string): void;

/**
 * hover on an element (will wait for the element to appear before hovering on it)
 * @param selector Element selector
 * @example:
 ```
 hover(<selector>);
 ```
 * @example:
 ```
 hover('#item');
 ```
 */
declare function hover(selector: string): void;

/**
 * The same as click but use right mouse button instead (will wait for the element to appear before clicking on it)
 * @param selector Element selector
 * @example:
 ```
 right_click(<selector>);
 ```
 * @example:
 ```
 right_click('#item');
 ```
 */
declare function right_click(selector: string): void;

/**
 * Move the mouse to the specified (x,y) position
 * @param x Target x position
 * @param y Target y position
 * @example:
 ```
 mouse_to(<x>, <y>);
 ```
 * @example:
 ```
 mouse_to(0, 0);
 ```
 */
declare function mouse_to(
  x: Record<string, unknown>,
  y: Record<string, unknown>
): void;

/**
 * Enter text into an input (will wait for the input to appear before typing)
 * @param selector Element selector
 * @param text Text to enter
 * @example:
 ```
 type(<selector>, <text>);
 ```
 * @example:
 ```
 type('#location', 'New York');
 ```
 * @example:
 ```
 type(<selector>, <text>, {replace: true}); // replacing text in input if it is not empty
 ```
 * @example:
 ```
 type('[id$=input-box]', <text>); // type text to an element with id ending "input-box" (e.g. <input id="c2E57-input-box">)
 ```
 * @example:
 ```
 type(<selector>, ['Enter']); // dispatching 'Enter' key press
 ```
 * @example:
 ```
 type(<selector>, ['Some text', 'Enter']); // typing text and then dispatching 'Enter' key press
 ```
 * @example:
 ```
 type(<selector>, ['Backspace']); // deleting 1 char from input
 ```
 */
declare function type(selector: string, text: Record<string, unknown>): void;

/**
 * Type special characters like Enter or Backspace in the currently focused input (usually used after typing something in a search box)
 * @param key Key to press
 * @example:
 ```
 press_key('Enter');
 ```
 * @example:
 ```
 press_key('Backspace');
 ```
 */
declare function press_key(key: Record<string, unknown>): void;

/**
 * Pick a value from a select element
 * @param selector Element selector
 * @example:
 ```
 select(<select>, <value>);
 ```
 * @example:
 ```
 select('#country', 'Canada');
 ```
 */
declare function select(selector: string): void;

/**
 * Check if an element exists on page, and return a boolean accordingly
 * @param selector Valid CSS selector
 * @param timeout Timeout duration to wait for the element to appear on the page
 * @example:
 ```
 el_exists('#example'); // => true
 ```
 * @example:
 ```
 el_exists('.does_not_exist'); // => false
 ```
 * @example:
 ```
 el_exists('.does_not_exist', 5e3); // => false (after 5 seconds)
 ```
 */
declare function el_exists(
  selector: string,
  timeout: Record<string, unknown>
): void;

/**
 * Check if element is visible on page
 * @param selector Valid CSS selector
 * @param timeout Timeout duration to wait for the element to be visible on the page
 * @example:
 ```
 el_is_visible('#example');
 ```
 * @example:
 ```
 el_is_visible('.is_not_visible', 5e3); // false (after 5 seconds)
 ```
 */
declare function el_is_visible(
  selector: string,
  timeout: Record<string, unknown>
): void;

/**
 * Solve any captchas shown on the page
 *
 * @example:
 ```
 solve_captcha();
 ```
 * @example:
 ```
 solve_captcha({type: 'simple', selector: '#image', input: '#input'});
 ```
 */
declare function solve_captcha(): void;

/**
 * URL class from NodeJS standard "url" module
 * @param url URL string
 * @example:
 ```
 let u = new URL('https://example.com');
 ```
 */
declare function URL(url: string): void;

/**
 * Object with info about current location. Available fields:
 href
 *
 * @example:
 ```
 navigate('https://example.com');
 location.href; // "https://example.com/"
 ```
 */
declare var location: { href: string };

/**
 * Wait for any matching condition to succeed
 *
 * @example:
 ```
 wait_any(['#title', '#notfound']);
 ```
 */
declare function wait_any(): void;

/**
 * Save the response data from a browser request
 * @param name The name of the tagged field
 * @param pattern The URL pattern to match
 * @param options Set options.jsonp=true to parse response bodies that are in jsonp format. This will be automatically detected when possible
 * @example:
 ```
 tag_response(<field>, <pattern>, <options>);
 ```
 * @example:
 ```
 tag_response('resp', /url/, {jsonp: true});
 ```
 * @example:
 ```
 tag_response('resp', /url/, {allow_error: true});
 ```
 * @example:
 ```
 tag_response('resp', (req, res)=>{
            if (req.url.includes('/api/'))
            {
                let request_body = req.body;
                let request_headers = req.headers;
                let response_body = res.body;
                let response_headers = res.headers;
            }
        });
 ```
 * @example:
 ```

 tag_response('teams', /\/api\/teams/);
 navigate('https://example.com/sports');
 let teams = parse().teams;
 for (let team of teams)
 collect(team);

 ```
 */
declare function tag_response(
  name: Record<string, unknown>,
  pattern: Record<string, unknown>,
  options: Record<string, unknown>
): void;

/**
 * Save the responses from all browser request that match
 * @param field The name of the tagged field
 * @param pattern The URL pattern to match
 * @param options Set options.jsonp=true to parse response bodies that are in jsonp format. This will be automatically detected when possible
 * @example:
 ```
 tag_all_responses(<field>, <pattern>, <options>);
 ```
 * @example:
 ```
 tag_all_responses('resp', /url/, {jsonp: true});
 ```
 * @example:
 ```
 tag_all_responses('resp', /url/, {allow_error: true});
 ```
 * @example:
 ```
 tag_all_responses('profiles', /\/api\/profile/);
 navigate('https://example.com/sports');
 let profiles = parse().profiles;
 for (let profile of profiles)
 collect(profile);

 ```
 */
declare function tag_all_responses(
  field: string,
  pattern: Record<string, unknown>,
  options: Record<string, unknown>
): void;

/**
 * Extract some JSON data saved in a script on the page
 * @param name The name of the tagged script
 * @param selector The selector of the script to tag
 * @example:
 ```
 tag_script(<field>, <selector>);
 ```
 * @example:
 ```
 tag_script('teams', '#preload-data');
 ```
 * @example:
 ```
 tag_script('ssr_state', '#__SSR_DATA__');
 navigate('https://example.com/');
 collect(parse().ssr_state);

 ```
 */
declare function tag_script(
  name: Record<string, unknown>,
  selector: string
): void;

/**
 * Tag a javascript value from the browser page
 * @param field The path to the relevant data
 * @param key
 * @example:
 ```
 tag_window_field(<field>, <key>);
 ```
 * @example:
 ```
 tag_window_field('initData', '__INIT_DATA__');
 ```
 */
declare function tag_window_field(field: string, key: string): void;

/**
 * Save the video url from an element
 * @param field The name of the tagged field
 * @param selector A valid CSS selector
 * @param opt download options (see example)
 * @example:
 ```
 tag_video(field, selector);
 ```
 * @example:
 ```
 tag_video('video', '#product-video', {download: true});
 ```
 */
declare function tag_video(
  field: string,
  selector: string,
  opt: Record<string, unknown>
): void;

/**
 * Collect video data
 * @param src Video URL
 * @example:
 ```
 let v = new Video('https://example.com/video.mp4');
 collect({video: v});
 ```
 */
declare function Video(src: Record<string, unknown>): void;

/**
 * Save a screenshot of the page HTML
 * @param field The name of the tagged field
 * @param options Download options (see example)
 * @example:
 ```
 tag_screenshot(<field>, <options>);
 ```
 * @example:
 ```
 tag_screenshot('html_screenshot', {filename: 'screen'});
 ```
 * @example:
 ```
 tag_screenshot('view', {full_page: false}); // full_page defaults to true
 ```
 */
declare function tag_screenshot(
  field: string,
  options: Record<string, unknown>
): void;

/**
 * Save the image url from an element
 * @param field The name of the tagged field
 * @param selector A valid CSS selector
 * @example:
 ```
 tag_image(field, selector);
 ```
 * @example:
 ```
 tag_image('image', '#product-image');
 ```
 */
declare function tag_image(field: string, selector: string): void;

/**
 * Collect image data
 * @param src Image URL or data:image URI string
 * @example:
 ```
 let i = new Image('https://example.com/image.png');
 collect({image: i});
 ```
 */
declare function Image(src: string): void;

/**
 * Parse the current page as a search engine result page
 * @param field The name of the tagged field
 * @param type Parser type: (e.g. bing, google)
 * @example:
 ```
 tag_serp('serp_bing_results', 'bing')
 ```
 * @example:
 ```
 tag_serp('serp_google_results', 'google')
 ```
 */
declare function tag_serp(field: string, type: string): void;

/**
 * Allows to get files downloaded by browser
 * @param url A pattern or a string to match requests against
 * @example:
 ```

 let SEC = 1000;
 let download = tag_download(/example.com\/foo\/bar/);
 click('button#download');
 let file1 = download.next_file({timeout: 10*SEC});
 let file2 = download.next_file({timeout: 20*SEC});
 collect({file1, file2});

 ```
 */
declare function tag_download(url: string): void;

declare interface CapturedGraphql {
  wait_captured: (options?: { timeout?: number }) => [object, object];
  replay: (req?: any) => object;
  is_captured: () => boolean;
}
/**
 * Capture and replay graphql requests with changed variables
 * @param options Params to control graphql request to capture
 * @example:
 ```
 let q = capture_graphql({
    payload: {id: 'ProfileQuery'},
});
 navigate('https://example.com');
 let [first_query, first_response] = q.wait_captured();
 collect(first_response.data.profile);
 let second = q.replay({
    variables: {other_id: 2},
});
 collect(second.data.profile);

 ```
 * @example:
 ```
 let q = capture_graphql({
    payload: {id: 'SearchQuery'},
});
 navigate('https://example.com');
 if (!q.is_captured())
 click('#load_more');
 let [first_query, first_response] = q.wait_captured();
 collect(first_response.data.profile);
 let second = q.replay({
    variables: {other_id: 2},
});
 collect(second.data.profile);

 ```
 */
declare function capture_graphql(options: { payload: any }): CapturedGraphql;

/**
 * Influence the process of the HTML capturing
 * @param options An object which accepts options defining how HTML capturing should be processed
 * @example:
 ```
 html_capture_options({
    coordinate_attributes: true,
});
 ```
 */
declare function html_capture_options(options: {
  coordinate_attributes: boolean;
}): void;

/**
 * Assert the capability of the browser to render the given font family on the page
 *
 * @example:
 ```
 font_exists(<font-family>);
 ```
 * @example:
 ```
 font_exists('Liberation Mono');
 ```
 */
declare function font_exists(name: string): boolean;

/**
 *  Popups can appear at any time during a crawl and it's not always clear when you should be waiting for or closing them. Add close_popup() at the top of your code to add a background watcher that will close the popup when it appears. If a popup appears multiple times, it will always be closed
 * @param popup_selector selector A valid CSS selector
 * @param close_selector selector A valid CSS selector
 * @example:
 ```
 close_popup('.popup', '.popup_close');
 ```
 */
declare function close_popup(
  popup_selector: string,
  close_selector: string
): void;

/**
 * Scroll to the bottom of a list to trigger loading more items. Useful for lazy-loaded infinite-scroll sites
 * @param selector Selector for the element that contains the lazy-loaded items
 * @param [options]
 * @example:
 ```
 load_more(<selector>);
 ```
 * @example:
 ```
 load_more('.search-results');
 ```
 * @example:
 ```
 load_more('.search-results', {children: '.result-item', trigger_selector: '.btn-load-more', timeout: 10000});
 ```
 */
declare function load_more(
  selector: string,
  options: { children: string; trigger_selector: string; timeout: number }
): void;

/**
 * Scroll the page so that an element is visible
 If you're doing this to trigger loading some more elements from a lazy loaded list, use load_more()
 Defaults to scrolling in a natural way, which may take several seconds. If you want to jump immediatley, use {immediate: true}
 * @param selector Selector of the element you want to scroll to
 * @param [options] Options
 * @example:
 ```
 scroll_to(<selector>);
 ```
 * @example:
 ```
 scroll_to('.author-profile');
 ```
 * @example:
 ```
 scroll_to('top'); // scroll to the top of the page
 ```
 * @example:
 ```
 scroll_to('bottom'); // scroll to the bottom of the page
 ```
 * @example:
 ```
 scroll_to('top', {immediate: true}); // jump to top of page immediately
 ```
 */
declare function scroll_to(
  selector: string | "top" | "bottom",
  options?: { immediate: boolean }
): void;

/**
 * Scroll through the page so that all the elements matching the selector will be visible on screen
 * @param selector Selector of the elements you want to scroll through
 * @example:
 ```
 scroll_to_all(<selector>);
 ```
 * @example:
 ```
 scroll_to_all('.author-profiles');
 ```
 */
declare function scroll_to_all(selector: string): void;

/**
 * Add a comment in the page HTML. Can be used to embed metadata inside HTML snapshots.
 * @param comment Body of the comment
 * @example:
 ```
 embed_html_comment('trace-id: asdf123');
 ```
 */
declare function embed_html_comment(comment: string): void;

/**
 * The box of coordinates that describes the area of an element (relative to the page, not the browser viewport). Only the first element matched will be measured
 * @param selector A valid CSS selector for the element
 * @example:
 ```
 let box = bounding_box('.product-list');
 // box == {
//   top: 10,
//   right: 800,
//   bottom: 210,
//   left: 200,
//   x: 200,
//   y: 10,
//   width: 600,
//   height: 200,
// }
 ```
 */
declare function bounding_box(selector: string): {
  top: number;
  right: number;
  bottom: number;
  left: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Returns the status code of the last page load
 *
 * @example:
 ```
 collect({status_code: status_code()});
 ```
 */
declare function status_code(): number;

/**
 * Returns the response headers of the last page load
 *
 * @example:
 ```
 let headers = response_headers();
 console.log('content-type', headers['content-type']);
 ```
 */
declare function response_headers(): Record<string, string>;

/**
 * Make a direct HTTP request
 * @param url | options the url to make the request to, or request options (see examples)
 * @example:
 ```
 let res = request('http://www.example.com');
 ```
 * @example:
 ```
 let res = request({url: 'http://www.example.com', method: 'POST', headers: {'Content-type': 'application/json'}, body: {hello: 'world'}})
 ```
 */
declare function request(
  url:
    | string
    | {
        url: string;
        method: "POST" | "GET";
        headers: Record<string, string>;
        body: Record<string, unknown>;
      }
): void;

/**
 * Read a list of urls from a sitemap xml (supports sitemap indexes, and .gz compressed sitemaps. see examples.)
 *
 * @example:
 ```
 let {pages} = load_sitemap({url: 'https://example.com/sitemap.xml.gz'});
 ```
 * @example:
 ```
 let {children} = load_sitemap({url: 'https://example.com/sitemap-index.xml'});
 ```
 */
declare function load_sitemap(config: { url: string }): {
  pages: any;
  children: any;
};

/**
 * Returns the final URL that the given url argument leads to
 * @param url URL string/instance
 * @example:
 ```
 let {href} = parse().anchor_elem_data;
 collect({final_url: resolve_url(href)});
 ```
 */
declare function resolve_url(url: string): void;

/**
 * Collect price/money data
 * @param value Amount of money
 * @param currency Currency code
 * @example:
 ```
 let p = new Money(10, 'USD');
 collect({product_price: p});
 ```
 */
declare function Money(
  value: Record<string, unknown>,
  currency: Record<string, unknown>
): void;

/**
 * Returns history of URL redirects since last navigate
 *
 * @example:
 ```
 navigate('http://google.com');
 let redirects = redirect_history();
 // returns:
 // [
 //   'http://google.com',
 //   'http://www.google.com',
 //   'https://www.google.com/',
 // ]
 ```
 */
declare function redirect_history(): void;

/**
 * Block resources to load
 * @example:
 * ```
 * block([
 *   "*.png",
 *   "*.jpg",
 *   "*.mp4",
 *   "*.css",
 *   "*.svg",
 *   "*criteo.net*",
 *   "*liveperson.net*",
 *   "*amplitude.com*",
 *   "*facebook.com*",
 *   "*quantcount*",
 *   "*quantummetric*",
 *   "*ads.linkedin.com",
 *   "*google-analytics",
 *   "*googletagmanager*",
 *   "*googleanalytics*",
 *   "*googleusercontent*",
 * ]);
 */
declare function block(resources: string[]): void;

declare function enable_peer_swap(): void;

interface Console {
  assert(condition?: boolean, ...data: any[]): void;
  clear(): void;
  count(label?: string): void;
  countReset(label?: string): void;
  debug(...data: any[]): void;
  dir(item?: any, options?: any): void;
  dirxml(...data: any[]): void;
  error(...data: any[]): void;
  group(...data: any[]): void;
  groupCollapsed(...data: any[]): void;
  groupEnd(): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  table(tabularData?: any, properties?: string[]): void;
  time(label?: string): void;
  timeEnd(label?: string): void;
  timeLog(label?: string, ...data: any[]): void;
  timeStamp(label?: string): void;
  trace(...data: any[]): void;
  warn(...data: any[]): void;
}

declare var console: Console;
