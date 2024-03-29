/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) : typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper)) })(this, (function (Popper) {
  'use strict'; function _interopNamespace(e) {
    if (e && e.__esModule) return e; const n = Object.create(null); if (e) { for (const k in e) { if (k !== 'default') { const d = Object.getOwnPropertyDescriptor(e, k); Object.defineProperty(n, k, d.get ? d : { enumerable: !0, get: () => e[k] }) } } }
    n.default = e; return Object.freeze(n)
  }
  const Popper__namespace = _interopNamespace(Popper); const MAX_UID = 1000000; const MILLISECONDS_MULTIPLIER = 1000; const TRANSITION_END = 'transitionend'; const toType = obj => {
    if (obj === null || obj === undefined) { return `${obj}` }
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  }; const getUID = prefix => { do { prefix += Math.floor(Math.random() * MAX_UID) } while (document.getElementById(prefix)); return prefix }; const getSelector = element => {
    let selector = element.getAttribute('data-bs-target'); if (!selector || selector === '#') {
      let hrefAttr = element.getAttribute('href'); if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) { return null }
      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) { hrefAttr = `#${hrefAttr.split('#')[1]}` }
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null
    }
    return selector
  }; const getSelectorFromElement = element => {
    const selector = getSelector(element); if (selector) { return document.querySelector(selector) ? selector : null }
    return null
  }; const getElementFromSelector = element => { const selector = getSelector(element); return selector ? document.querySelector(selector) : null }; const getTransitionDurationFromElement = element => {
    if (!element) { return 0 }
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element); const floatTransitionDuration = Number.parseFloat(transitionDuration); const floatTransitionDelay = Number.parseFloat(transitionDelay); if (!floatTransitionDuration && !floatTransitionDelay) { return 0 }
    transitionDuration = transitionDuration.split(',')[0]; transitionDelay = transitionDelay.split(',')[0]; return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
  }; const triggerTransitionEnd = element => { element.dispatchEvent(new Event(TRANSITION_END)) }; const isElement = obj => {
    if (!obj || typeof obj !== 'object') { return !1 }
    if (typeof obj.jquery !== 'undefined') { obj = obj[0] }
    return typeof obj.nodeType !== 'undefined'
  }; const getElement = obj => {
    if (isElement(obj)) { return obj.jquery ? obj[0] : obj }
    if (typeof obj === 'string' && obj.length > 0) { return document.querySelector(obj) }
    return null
  }; const typeCheckConfig = (componentName, config, configTypes) => { Object.keys(configTypes).forEach(property => { const expectedTypes = configTypes[property]; const value = config[property]; const valueType = value && isElement(value) ? 'element' : toType(value); if (!new RegExp(expectedTypes).test(valueType)) { throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`) } }) }; const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) { return !1 }
    return getComputedStyle(element).getPropertyValue('visibility') === 'visible'
  }; const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) { return !0 }
    if (element.classList.contains('disabled')) { return !0 }
    if (typeof element.disabled !== 'undefined') { return element.disabled }
    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
  }; const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) { return null }
    if (typeof element.getRootNode === 'function') { const root = element.getRootNode(); return root instanceof ShadowRoot ? root : null }
    if (element instanceof ShadowRoot) { return element }
    if (!element.parentNode) { return null }
    return findShadowRoot(element.parentNode)
  }; const noop = () => { }; const reflow = element => { element.offsetHeight }; const getjQuery = () => {
    const { jQuery } = window; if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) { return jQuery }
    return null
  }; const DOMContentLoadedCallbacks = []; const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      if (!DOMContentLoadedCallbacks.length) { document.addEventListener('DOMContentLoaded', () => { DOMContentLoadedCallbacks.forEach(callback => callback()) }) }
      DOMContentLoadedCallbacks.push(callback)
    } else { callback() }
  }; const isRTL = () => document.documentElement.dir === 'rtl'; const defineJQueryPlugin = plugin => { onDOMContentLoaded(() => { const $ = getjQuery(); if ($) { const name = plugin.NAME; const JQUERY_NO_CONFLICT = $.fn[name]; $.fn[name] = plugin.jQueryInterface; $.fn[name].Constructor = plugin; $.fn[name].noConflict = () => { $.fn[name] = JQUERY_NO_CONFLICT; return plugin.jQueryInterface } } }) }; const execute = callback => { if (typeof callback === 'function') { callback() } }; const executeAfterTransition = (callback, transitionElement, waitForTransition = !0) => {
    if (!waitForTransition) { execute(callback); return }
    const durationPadding = 5; const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding; let called = !1; const handler = ({ target }) => {
      if (target !== transitionElement) { return }
      called = !0; transitionElement.removeEventListener(TRANSITION_END, handler); execute(callback)
    }; transitionElement.addEventListener(TRANSITION_END, handler); setTimeout(() => { if (!called) { triggerTransitionEnd(transitionElement) } }, emulatedDuration)
  }; const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    let index = list.indexOf(activeElement); if (index === -1) { return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0] }
    const listLength = list.length; index += shouldGetNext ? 1 : -1; if (isCycleAllowed) { index = (index + listLength) % listLength }
    return list[Math.max(0, Math.min(index, listLength - 1))]
  }; const namespaceRegex = /[^.]*(?=\..*)\.|.*/; const stripNameRegex = /\..*/; const stripUidRegex = /::\d+$/; const eventRegistry = {}; let uidEvent = 1; const customEvents = { mouseenter: 'mouseover', mouseleave: 'mouseout' }; const customEventsRegex = /^(mouseenter|mouseleave)/i; const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']); function getUidEvent(element, uid) { return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++ }
  function getEvent(element) { const uid = getUidEvent(element); element.uidEvent = uid; eventRegistry[uid] = eventRegistry[uid] || {}; return eventRegistry[uid] }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element; if (handler.oneOff) { EventHandler.off(element, event.type, fn) }
      return fn.apply(element, [event])
    }
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector); for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target; if (handler.oneOff) { EventHandler.off(element, event.type, selector, fn) }
            return fn.apply(target, [event])
          }
        }
      }
      return null
    }
  }
  function findHandler(events, handler, delegationSelector = null) {
    const uidEventList = Object.keys(events); for (let i = 0, len = uidEventList.length; i < len; i++) { const event = events[uidEventList[i]]; if (event.originalHandler === handler && event.delegationSelector === delegationSelector) { return event } }
    return null
  }
  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === 'string'; const originalHandler = delegation ? delegationFn : handler; let typeEvent = getTypeEvent(originalTypeEvent); const isNative = nativeEvents.has(typeEvent); if (!isNative) { typeEvent = originalTypeEvent }
    return [delegation, originalHandler, typeEvent]
  }
  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) { return }
    if (!handler) { handler = delegationFn; delegationFn = null }
    if (customEventsRegex.test(originalTypeEvent)) { const wrapFn = fn => { return function (event) { if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) { return fn.call(this, event) } } }; if (delegationFn) { delegationFn = wrapFn(delegationFn) } else { handler = wrapFn(handler) } }
    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn); const events = getEvent(element); const handlers = events[typeEvent] || (events[typeEvent] = {}); const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null); if (previousFn) { previousFn.oneOff = previousFn.oneOff && oneOff; return }
    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, '')); const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler); fn.delegationSelector = delegation ? handler : null; fn.originalHandler = originalHandler; fn.oneOff = oneOff; fn.uidEvent = uid; handlers[uid] = fn; element.addEventListener(typeEvent, fn, delegation)
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector); if (!fn) { return }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector)); delete events[typeEvent][fn.uidEvent]
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) { const storeElementEvent = events[typeEvent] || {}; Object.keys(storeElementEvent).forEach(handlerKey => { if (handlerKey.includes(namespace)) { const event = storeElementEvent[handlerKey]; removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector) } }) }
  function getTypeEvent(event) { event = event.replace(stripNameRegex, ''); return customEvents[event] || event }
  const EventHandler = {
    on(element, event, handler, delegationFn) { addHandler(element, event, handler, delegationFn, !1) }, one(element, event, handler, delegationFn) { addHandler(element, event, handler, delegationFn, !0) }, off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) { return }
      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn); const inNamespace = typeEvent !== originalTypeEvent; const events = getEvent(element); const isNamespace = originalTypeEvent.startsWith('.'); if (typeof originalHandler !== 'undefined') {
        if (!events || !events[typeEvent]) { return }
        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null); return
      }
      if (isNamespace) { Object.keys(events).forEach(elementEvent => { removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1)) }) }
      const storeElementEvent = events[typeEvent] || {}; Object.keys(storeElementEvent).forEach(keyHandlers => { const handlerKey = keyHandlers.replace(stripUidRegex, ''); if (!inNamespace || originalTypeEvent.includes(handlerKey)) { const event = storeElementEvent[keyHandlers]; removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector) } })
    }, trigger(element, event, args) {
      if (typeof event !== 'string' || !element) { return null }
      const $ = getjQuery(); const typeEvent = getTypeEvent(event); const inNamespace = event !== typeEvent; const isNative = nativeEvents.has(typeEvent); let jQueryEvent; let bubbles = !0; let nativeDispatch = !0; let defaultPrevented = !1; let evt = null; if (inNamespace && $) { jQueryEvent = $.Event(event, args); $(element).trigger(jQueryEvent); bubbles = !jQueryEvent.isPropagationStopped(); nativeDispatch = !jQueryEvent.isImmediatePropagationStopped(); defaultPrevented = jQueryEvent.isDefaultPrevented() }
      if (isNative) { evt = document.createEvent('HTMLEvents'); evt.initEvent(typeEvent, bubbles, !0) } else { evt = new CustomEvent(event, { bubbles, cancelable: !0 }) }
      if (typeof args !== 'undefined') { Object.keys(args).forEach(key => { Object.defineProperty(evt, key, { get() { return args[key] } }) }) }
      if (defaultPrevented) { evt.preventDefault() }
      if (nativeDispatch) { element.dispatchEvent(evt) }
      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') { jQueryEvent.preventDefault() }
      return evt
    }
  }; const elementMap = new Map(); const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) { elementMap.set(element, new Map()) }
      const instanceMap = elementMap.get(element); if (!instanceMap.has(key) && instanceMap.size !== 0) { console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`); return }
      instanceMap.set(key, instance)
    }, get(element, key) {
      if (elementMap.has(element)) { return elementMap.get(element).get(key) || null }
      return null
    }, remove(element, key) {
      if (!elementMap.has(element)) { return }
      const instanceMap = elementMap.get(element); instanceMap.delete(key); if (instanceMap.size === 0) { elementMap.delete(element) }
    }
  }; const VERSION = '5.1.3'; class BaseComponent {
    constructor(element) {
      element = getElement(element); if (!element) { return }
      this._element = element; Data.set(this._element, this.constructor.DATA_KEY, this)
    }
    dispose() { Data.remove(this._element, this.constructor.DATA_KEY); EventHandler.off(this._element, this.constructor.EVENT_KEY); Object.getOwnPropertyNames(this).forEach(propertyName => { this[propertyName] = null }) }
    _queueCallback(callback, element, isAnimated = !0) { executeAfterTransition(callback, element, isAnimated) }
    static getInstance(element) { return Data.get(getElement(element), this.DATA_KEY) }
    static getOrCreateInstance(element, config = {}) { return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null) }
    static get VERSION() { return VERSION }
    static get NAME() { throw new Error('You have to implement the static method "NAME", for each component!') }
    static get DATA_KEY() { return `bs.${this.NAME}` }
    static get EVENT_KEY() { return `.${this.DATA_KEY}` }
  }
  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`; const name = component.NAME; EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) { event.preventDefault() }
      if (isDisabled(this)) { return }
      const target = getElementFromSelector(this) || this.closest(`.${name}`); const instance = component.getOrCreateInstance(target); instance[method]()
    })
  }; const NAME$d = 'alert'; const DATA_KEY$c = 'bs.alert'; const EVENT_KEY$c = `.${DATA_KEY$c}`; const EVENT_CLOSE = `close${EVENT_KEY$c}`; const EVENT_CLOSED = `closed${EVENT_KEY$c}`; const CLASS_NAME_FADE$5 = 'fade'; const CLASS_NAME_SHOW$8 = 'show'; class Alert extends BaseComponent {
    static get NAME() { return NAME$d }
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE); if (closeEvent.defaultPrevented) { return }
      this._element.classList.remove(CLASS_NAME_SHOW$8); const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5); this._queueCallback(() => this._destroyElement(), this._element, isAnimated)
    }
    _destroyElement() { this._element.remove(); EventHandler.trigger(this._element, EVENT_CLOSED); this.dispose() }
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this); if (typeof config !== 'string') { return }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') { throw new TypeError(`No method named "${config}"`) }
        data[config](this)
      })
    }
  }
  enableDismissTrigger(Alert, 'close'); defineJQueryPlugin(Alert); const NAME$c = 'button'; const DATA_KEY$b = 'bs.button'; const EVENT_KEY$b = `.${DATA_KEY$b}`; const DATA_API_KEY$7 = '.data-api'; const CLASS_NAME_ACTIVE$3 = 'active'; const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]'; const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`; class Button extends BaseComponent {
    static get NAME() { return NAME$c }
    toggle() { this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3)) }
    static jQueryInterface(config) { return this.each(function () { const data = Button.getOrCreateInstance(this); if (config === 'toggle') { data[config]() } }) }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => { event.preventDefault(); const button = event.target.closest(SELECTOR_DATA_TOGGLE$5); const data = Button.getOrCreateInstance(button); data.toggle() }); defineJQueryPlugin(Button); function normalizeData(val) {
    if (val === 'true') { return !0 }
    if (val === 'false') { return !1 }
    if (val === Number(val).toString()) { return Number(val) }
    if (val === '' || val === 'null') { return null }
    return val
  }
  function normalizeDataKey(key) { return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`) }
  const Manipulator = {
    setDataAttribute(element, key, value) { element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value) }, removeDataAttribute(element, key) { element.removeAttribute(`data-bs-${normalizeDataKey(key)}`) }, getDataAttributes(element) {
      if (!element) { return {} }
      const attributes = {}; Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => { let pureKey = key.replace(/^bs/, ''); pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length); attributes[pureKey] = normalizeData(element.dataset[key]) }); return attributes
    }, getDataAttribute(element, key) { return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`)) }, offset(element) { const rect = element.getBoundingClientRect(); return { top: rect.top + window.pageYOffset, left: rect.left + window.pageXOffset } }, position(element) { return { top: element.offsetTop, left: element.offsetLeft } }
  }; const NODE_TEXT = 3; const SelectorEngine = {
    find(selector, element = document.documentElement) { return [].concat(...Element.prototype.querySelectorAll.call(element, selector)) }, findOne(selector, element = document.documentElement) { return Element.prototype.querySelector.call(element, selector) }, children(element, selector) { return [].concat(...element.children).filter(child => child.matches(selector)) }, parents(element, selector) {
      const parents = []; let ancestor = element.parentNode; while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) { parents.push(ancestor) }
        ancestor = ancestor.parentNode
      }
      return parents
    }, prev(element, selector) {
      let previous = element.previousElementSibling; while (previous) {
        if (previous.matches(selector)) { return [previous] }
        previous = previous.previousElementSibling
      }
      return []
    }, next(element, selector) {
      let next = element.nextElementSibling; while (next) {
        if (next.matches(selector)) { return [next] }
        next = next.nextElementSibling
      }
      return []
    }, focusableChildren(element) { const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', '); return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el)) }
  }; const NAME$b = 'carousel'; const DATA_KEY$a = 'bs.carousel'; const EVENT_KEY$a = `.${DATA_KEY$a}`; const DATA_API_KEY$6 = '.data-api'; const ARROW_LEFT_KEY = 'ArrowLeft'; const ARROW_RIGHT_KEY = 'ArrowRight'; const TOUCHEVENT_COMPAT_WAIT = 500; const SWIPE_THRESHOLD = 40; const Default$a = { interval: 5000, keyboard: !0, slide: !1, pause: 'hover', wrap: !0, touch: !0 }; const DefaultType$a = { interval: '(number|boolean)', keyboard: 'boolean', slide: '(boolean|string)', pause: '(string|boolean)', wrap: 'boolean', touch: 'boolean' }; const ORDER_NEXT = 'next'; const ORDER_PREV = 'prev'; const DIRECTION_LEFT = 'left'; const DIRECTION_RIGHT = 'right'; const KEY_TO_DIRECTION = { [ARROW_LEFT_KEY]: DIRECTION_RIGHT, [ARROW_RIGHT_KEY]: DIRECTION_LEFT }; const EVENT_SLIDE = `slide${EVENT_KEY$a}`; const EVENT_SLID = `slid${EVENT_KEY$a}`; const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`; const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`; const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`; const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`; const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`; const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`; const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`; const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`; const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`; const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`; const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`; const CLASS_NAME_CAROUSEL = 'carousel'; const CLASS_NAME_ACTIVE$2 = 'active'; const CLASS_NAME_SLIDE = 'slide'; const CLASS_NAME_END = 'carousel-item-end'; const CLASS_NAME_START = 'carousel-item-start'; const CLASS_NAME_NEXT = 'carousel-item-next'; const CLASS_NAME_PREV = 'carousel-item-prev'; const CLASS_NAME_POINTER_EVENT = 'pointer-event'; const SELECTOR_ACTIVE$1 = '.active'; const SELECTOR_ACTIVE_ITEM = '.active.carousel-item'; const SELECTOR_ITEM = '.carousel-item'; const SELECTOR_ITEM_IMG = '.carousel-item img'; const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev'; const SELECTOR_INDICATORS = '.carousel-indicators'; const SELECTOR_INDICATOR = '[data-bs-target]'; const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]'; const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]'; const POINTER_TYPE_TOUCH = 'touch'; const POINTER_TYPE_PEN = 'pen'; class Carousel extends BaseComponent {
    constructor(element, config) { super(element); this._items = null; this._interval = null; this._activeElement = null; this._isPaused = !1; this._isSliding = !1; this.touchTimeout = null; this.touchStartX = 0; this.touchDeltaX = 0; this._config = this._getConfig(config); this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element); this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0; this._pointerEvent = Boolean(window.PointerEvent); this._addEventListeners() }
    static get Default() { return Default$a }
    static get NAME() { return NAME$b }
    next() { this._slide(ORDER_NEXT) }
    nextWhenVisible() { if (!document.hidden && isVisible(this._element)) { this.next() } }
    prev() { this._slide(ORDER_PREV) }
    pause(event) {
      if (!event) { this._isPaused = !0 }
      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) { triggerTransitionEnd(this._element); this.cycle(!0) }
      clearInterval(this._interval); this._interval = null
    }
    cycle(event) {
      if (!event) { this._isPaused = !1 }
      if (this._interval) { clearInterval(this._interval); this._interval = null }
      if (this._config && this._config.interval && !this._isPaused) { this._updateInterval(); this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval) }
    }
    to(index) {
      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element); const activeIndex = this._getItemIndex(this._activeElement); if (index > this._items.length - 1 || index < 0) { return }
      if (this._isSliding) { EventHandler.one(this._element, EVENT_SLID, () => this.to(index)); return }
      if (activeIndex === index) { this.pause(); this.cycle(); return }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV; this._slide(order, this._items[index])
    }
    _getConfig(config) { config = { ...Default$a, ...Manipulator.getDataAttributes(this._element), ...(typeof config === 'object' ? config : {}) }; typeCheckConfig(NAME$b, config, DefaultType$a); return config }
    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX); if (absDeltax <= SWIPE_THRESHOLD) { return }
      const direction = absDeltax / this.touchDeltaX; this.touchDeltaX = 0; if (!direction) { return }
      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT)
    }
    _addEventListeners() {
      if (this._config.keyboard) { EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event)) }
      if (this._config.pause === 'hover') { EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event)); EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event)) }
      if (this._config.touch && this._touchSupported) { this._addTouchEventListeners() }
    }
    _addTouchEventListeners() {
      const hasPointerPenTouch = event => { return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH) }; const start = event => { if (hasPointerPenTouch(event)) { this.touchStartX = event.clientX } else if (!this._pointerEvent) { this.touchStartX = event.touches[0].clientX } }; const move = event => { this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX }; const end = event => {
        if (hasPointerPenTouch(event)) { this.touchDeltaX = event.clientX - this.touchStartX }
        this._handleSwipe(); if (this._config.pause === 'hover') {
          this.pause(); if (this.touchTimeout) { clearTimeout(this.touchTimeout) }
          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval)
        }
      }; SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => { EventHandler.on(itemImg, EVENT_DRAG_START, event => event.preventDefault()) }); if (this._pointerEvent) { EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event)); EventHandler.on(this._element, EVENT_POINTERUP, event => end(event)); this._element.classList.add(CLASS_NAME_POINTER_EVENT) } else { EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event)); EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event)); EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event)) }
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) { return }
      const direction = KEY_TO_DIRECTION[event.key]; if (direction) { event.preventDefault(); this._slide(direction) }
    }
    _getItemIndex(element) { this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : []; return this._items.indexOf(element) }
    _getItemByOrder(order, activeElement) { const isNext = order === ORDER_NEXT; return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap) }
    _triggerSlideEvent(relatedTarget, eventDirectionName) { const targetIndex = this._getItemIndex(relatedTarget); const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element)); return EventHandler.trigger(this._element, EVENT_SLIDE, { relatedTarget, direction: eventDirectionName, from: fromIndex, to: targetIndex }) }
    _setActiveIndicatorElement(element) { if (this._indicatorsElement) { const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement); activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2); activeIndicator.removeAttribute('aria-current'); const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement); for (let i = 0; i < indicators.length; i++) { if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) { indicators[i].classList.add(CLASS_NAME_ACTIVE$2); indicators[i].setAttribute('aria-current', 'true'); break } } } }
    _updateInterval() {
      const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element); if (!element) { return }
      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10); if (elementInterval) { this._config.defaultInterval = this._config.defaultInterval || this._config.interval; this._config.interval = elementInterval } else { this._config.interval = this._config.defaultInterval || this._config.interval }
    }
    _slide(directionOrOrder, element) {
      const order = this._directionToOrder(directionOrOrder); const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element); const activeElementIndex = this._getItemIndex(activeElement); const nextElement = element || this._getItemByOrder(order, activeElement); const nextElementIndex = this._getItemIndex(nextElement); const isCycling = Boolean(this._interval); const isNext = order === ORDER_NEXT; const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END; const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV; const eventDirectionName = this._orderToDirection(order); if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) { this._isSliding = !1; return }
      if (this._isSliding) { return }
      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName); if (slideEvent.defaultPrevented) { return }
      if (!activeElement || !nextElement) { return }
      this._isSliding = !0; if (isCycling) { this.pause() }
      this._setActiveIndicatorElement(nextElement); this._activeElement = nextElement; const triggerSlidEvent = () => { EventHandler.trigger(this._element, EVENT_SLID, { relatedTarget: nextElement, direction: eventDirectionName, from: activeElementIndex, to: nextElementIndex }) }; if (this._element.classList.contains(CLASS_NAME_SLIDE)) { nextElement.classList.add(orderClassName); reflow(nextElement); activeElement.classList.add(directionalClassName); nextElement.classList.add(directionalClassName); const completeCallBack = () => { nextElement.classList.remove(directionalClassName, orderClassName); nextElement.classList.add(CLASS_NAME_ACTIVE$2); activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName); this._isSliding = !1; setTimeout(triggerSlidEvent, 0) }; this._queueCallback(completeCallBack, activeElement, !0) } else { activeElement.classList.remove(CLASS_NAME_ACTIVE$2); nextElement.classList.add(CLASS_NAME_ACTIVE$2); this._isSliding = !1; triggerSlidEvent() }
      if (isCycling) { this.cycle() }
    }
    _directionToOrder(direction) {
      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) { return direction }
      if (isRTL()) { return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV
    }
    _orderToDirection(order) {
      if (![ORDER_NEXT, ORDER_PREV].includes(order)) { return order }
      if (isRTL()) { return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT
    }
    static carouselInterface(element, config) {
      const data = Carousel.getOrCreateInstance(element, config); let { _config } = data; if (typeof config === 'object') { _config = { ..._config, ...config } }
      const action = typeof config === 'string' ? config : _config.slide; if (typeof config === 'number') { data.to(config) } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') { throw new TypeError(`No method named "${action}"`) }
        data[action]()
      } else if (_config.interval && _config.ride) { data.pause(); data.cycle() }
    }
    static jQueryInterface(config) { return this.each(function () { Carousel.carouselInterface(this, config) }) }
    static dataApiClickHandler(event) {
      const target = getElementFromSelector(this); if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) { return }
      const config = { ...Manipulator.getDataAttributes(target), ...Manipulator.getDataAttributes(this) }; const slideIndex = this.getAttribute('data-bs-slide-to'); if (slideIndex) { config.interval = !1 }
      Carousel.carouselInterface(target, config); if (slideIndex) { Carousel.getInstance(target).to(slideIndex) }
      event.preventDefault()
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler); EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => { const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE); for (let i = 0, len = carousels.length; i < len; i++) { Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i])) } }); defineJQueryPlugin(Carousel); const NAME$a = 'collapse'; const DATA_KEY$9 = 'bs.collapse'; const EVENT_KEY$9 = `.${DATA_KEY$9}`; const DATA_API_KEY$5 = '.data-api'; const Default$9 = { toggle: !0, parent: null }; const DefaultType$9 = { toggle: 'boolean', parent: '(null|element)' }; const EVENT_SHOW$5 = `show${EVENT_KEY$9}`; const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`; const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`; const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`; const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`; const CLASS_NAME_SHOW$7 = 'show'; const CLASS_NAME_COLLAPSE = 'collapse'; const CLASS_NAME_COLLAPSING = 'collapsing'; const CLASS_NAME_COLLAPSED = 'collapsed'; const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`; const CLASS_NAME_HORIZONTAL = 'collapse-horizontal'; const WIDTH = 'width'; const HEIGHT = 'height'; const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing'; const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]'; class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element); this._isTransitioning = !1; this._config = this._getConfig(config); this._triggerArray = []; const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4); for (let i = 0, len = toggleList.length; i < len; i++) { const elem = toggleList[i]; const selector = getSelectorFromElement(elem); const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element); if (selector !== null && filterElement.length) { this._selector = selector; this._triggerArray.push(elem) } }
      this._initializeChildren(); if (!this._config.parent) { this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()) }
      if (this._config.toggle) { this.toggle() }
    }
    static get Default() { return Default$9 }
    static get NAME() { return NAME$a }
    toggle() { if (this._isShown()) { this.hide() } else { this.show() } }
    show() {
      if (this._isTransitioning || this._isShown()) { return }
      let actives = []; let activesData; if (this._config.parent) { const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)) }
      const container = SelectorEngine.findOne(this._selector); if (actives.length) { const tempActiveData = actives.find(elem => container !== elem); activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null; if (activesData && activesData._isTransitioning) { return } }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5); if (startEvent.defaultPrevented) { return }
      actives.forEach(elemActive => {
        if (container !== elemActive) { Collapse.getOrCreateInstance(elemActive, { toggle: !1 }).hide() }
        if (!activesData) { Data.set(elemActive, DATA_KEY$9, null) }
      }); const dimension = this._getDimension(); this._element.classList.remove(CLASS_NAME_COLLAPSE); this._element.classList.add(CLASS_NAME_COLLAPSING); this._element.style[dimension] = 0; this._addAriaAndCollapsedClass(this._triggerArray, !0); this._isTransitioning = !0; const complete = () => { this._isTransitioning = !1; this._element.classList.remove(CLASS_NAME_COLLAPSING); this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7); this._element.style[dimension] = ''; EventHandler.trigger(this._element, EVENT_SHOWN$5) }; const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1); const scrollSize = `scroll${capitalizedDimension}`; this._queueCallback(complete, this._element, !0); this._element.style[dimension] = `${this._element[scrollSize]}px`
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) { return }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5); if (startEvent.defaultPrevented) { return }
      const dimension = this._getDimension(); this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`; reflow(this._element); this._element.classList.add(CLASS_NAME_COLLAPSING); this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7); const triggerArrayLength = this._triggerArray.length; for (let i = 0; i < triggerArrayLength; i++) { const trigger = this._triggerArray[i]; const elem = getElementFromSelector(trigger); if (elem && !this._isShown(elem)) { this._addAriaAndCollapsedClass([trigger], !1) } }
      this._isTransitioning = !0; const complete = () => { this._isTransitioning = !1; this._element.classList.remove(CLASS_NAME_COLLAPSING); this._element.classList.add(CLASS_NAME_COLLAPSE); EventHandler.trigger(this._element, EVENT_HIDDEN$5) }; this._element.style[dimension] = ''; this._queueCallback(complete, this._element, !0)
    }
    _isShown(element = this._element) { return element.classList.contains(CLASS_NAME_SHOW$7) }
    _getConfig(config) { config = { ...Default$9, ...Manipulator.getDataAttributes(this._element), ...config }; config.toggle = Boolean(config.toggle); config.parent = getElement(config.parent); typeCheckConfig(NAME$a, config, DefaultType$9); return config }
    _getDimension() { return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT }
    _initializeChildren() {
      if (!this._config.parent) { return }
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => { const selected = getElementFromSelector(element); if (selected) { this._addAriaAndCollapsedClass([element], this._isShown(selected)) } })
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) { return }
      triggerArray.forEach(elem => {
        if (isOpen) { elem.classList.remove(CLASS_NAME_COLLAPSED) } else { elem.classList.add(CLASS_NAME_COLLAPSED) }
        elem.setAttribute('aria-expanded', isOpen)
      })
    }
    static jQueryInterface(config) {
      return this.each(function () {
        const _config = {}; if (typeof config === 'string' && /show|hide/.test(config)) { _config.toggle = !1 }
        const data = Collapse.getOrCreateInstance(this, _config); if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') { throw new TypeError(`No method named "${config}"`) }
          data[config]()
        }
      })
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') { event.preventDefault() }
    const selector = getSelectorFromElement(this); const selectorElements = SelectorEngine.find(selector); selectorElements.forEach(element => { Collapse.getOrCreateInstance(element, { toggle: !1 }).toggle() })
  }); defineJQueryPlugin(Collapse); const NAME$9 = 'dropdown'; const DATA_KEY$8 = 'bs.dropdown'; const EVENT_KEY$8 = `.${DATA_KEY$8}`; const DATA_API_KEY$4 = '.data-api'; const ESCAPE_KEY$2 = 'Escape'; const SPACE_KEY = 'Space'; const TAB_KEY$1 = 'Tab'; const ARROW_UP_KEY = 'ArrowUp'; const ARROW_DOWN_KEY = 'ArrowDown'; const RIGHT_MOUSE_BUTTON = 2; const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`); const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`; const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`; const EVENT_SHOW$4 = `show${EVENT_KEY$8}`; const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`; const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`; const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`; const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`; const CLASS_NAME_SHOW$6 = 'show'; const CLASS_NAME_DROPUP = 'dropup'; const CLASS_NAME_DROPEND = 'dropend'; const CLASS_NAME_DROPSTART = 'dropstart'; const CLASS_NAME_NAVBAR = 'navbar'; const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]'; const SELECTOR_MENU = '.dropdown-menu'; const SELECTOR_NAVBAR_NAV = '.navbar-nav'; const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'; const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start'; const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end'; const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start'; const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end'; const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start'; const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start'; const Default$8 = { offset: [0, 2], boundary: 'clippingParents', reference: 'toggle', display: 'dynamic', popperConfig: null, autoClose: !0 }; const DefaultType$8 = { offset: '(array|string|function)', boundary: '(string|element)', reference: '(string|element|object)', display: 'string', popperConfig: '(null|object|function)', autoClose: '(boolean|string)' }; class Dropdown extends BaseComponent {
    constructor(element, config) { super(element); this._popper = null; this._config = this._getConfig(config); this._menu = this._getMenuElement(); this._inNavbar = this._detectNavbar() }
    static get Default() { return Default$8 }
    static get DefaultType() { return DefaultType$8 }
    static get NAME() { return NAME$9 }
    toggle() { return this._isShown() ? this.hide() : this.show() }
    show() {
      if (isDisabled(this._element) || this._isShown(this._menu)) { return }
      const relatedTarget = { relatedTarget: this._element }; const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget); if (showEvent.defaultPrevented) { return }
      const parent = Dropdown.getParentFromElement(this._element); if (this._inNavbar) { Manipulator.setDataAttribute(this._menu, 'popper', 'none') } else { this._createPopper(parent) }
      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) { [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop)) }
      this._element.focus(); this._element.setAttribute('aria-expanded', !0); this._menu.classList.add(CLASS_NAME_SHOW$6); this._element.classList.add(CLASS_NAME_SHOW$6); EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget)
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown(this._menu)) { return }
      const relatedTarget = { relatedTarget: this._element }; this._completeHide(relatedTarget)
    }
    dispose() {
      if (this._popper) { this._popper.destroy() }
      super.dispose()
    }
    update() { this._inNavbar = this._detectNavbar(); if (this._popper) { this._popper.update() } }
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget); if (hideEvent.defaultPrevented) { return }
      if ('ontouchstart' in document.documentElement) { [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop)) }
      if (this._popper) { this._popper.destroy() }
      this._menu.classList.remove(CLASS_NAME_SHOW$6); this._element.classList.remove(CLASS_NAME_SHOW$6); this._element.setAttribute('aria-expanded', 'false'); Manipulator.removeDataAttribute(this._menu, 'popper'); EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget)
    }
    _getConfig(config) {
      config = { ...this.constructor.Default, ...Manipulator.getDataAttributes(this._element), ...config }; typeCheckConfig(NAME$9, config, this.constructor.DefaultType); if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') { throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`) }
      return config
    }
    _createPopper(parent) {
      if (typeof Popper__namespace === 'undefined') { throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)') }
      let referenceElement = this._element; if (this._config.reference === 'parent') { referenceElement = parent } else if (isElement(this._config.reference)) { referenceElement = getElement(this._config.reference) } else if (typeof this._config.reference === 'object') { referenceElement = this._config.reference }
      const popperConfig = this._getPopperConfig(); const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === !1); this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig); if (isDisplayStatic) { Manipulator.setDataAttribute(this._menu, 'popper', 'static') }
    }
    _isShown(element = this._element) { return element.classList.contains(CLASS_NAME_SHOW$6) }
    _getMenuElement() { return SelectorEngine.next(this._element, SELECTOR_MENU)[0] }
    _getPlacement() {
      const parentDropdown = this._element.parentNode; if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) { return PLACEMENT_RIGHT }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) { return PLACEMENT_LEFT }
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end'; if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) { return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM
    }
    _detectNavbar() { return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null }
    _getOffset() {
      const { offset } = this._config; if (typeof offset === 'string') { return offset.split(',').map(val => Number.parseInt(val, 10)) }
      if (typeof offset === 'function') { return popperData => offset(popperData, this._element) }
      return offset
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = { placement: this._getPlacement(), modifiers: [{ name: 'preventOverflow', options: { boundary: this._config.boundary } }, { name: 'offset', options: { offset: this._getOffset() } }] }; if (this._config.display === 'static') { defaultBsPopperConfig.modifiers = [{ name: 'applyStyles', enabled: !1 }] }
      return { ...defaultBsPopperConfig, ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig) }
    }
    _selectMenuItem({ key, target }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible); if (!items.length) { return }
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus()
    }
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config); if (typeof config !== 'string') { return }
        if (typeof data[config] === 'undefined') { throw new TypeError(`No method named "${config}"`) }
        data[config]()
      })
    }
    static clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) { return }
      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3); for (let i = 0, len = toggles.length; i < len; i++) {
        const context = Dropdown.getInstance(toggles[i]); if (!context || context._config.autoClose === !1) { continue }
        if (!context._isShown()) { continue }
        const relatedTarget = { relatedTarget: context._element }; if (event) {
          const composedPath = event.composedPath(); const isMenuTarget = composedPath.includes(context._menu); if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) { continue }
          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) { continue }
          if (event.type === 'click') { relatedTarget.clickEvent = event }
        }
        context._completeHide(relatedTarget)
      }
    }
    static getParentFromElement(element) { return getElementFromSelector(element) || element.parentNode }
    static dataApiKeydownHandler(event) {
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) { return }
      const isActive = this.classList.contains(CLASS_NAME_SHOW$6); if (!isActive && event.key === ESCAPE_KEY$2) { return }
      event.preventDefault(); event.stopPropagation(); if (isDisabled(this)) { return }
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0]; const instance = Dropdown.getOrCreateInstance(getToggleButton); if (event.key === ESCAPE_KEY$2) { instance.hide(); return }
      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
        if (!isActive) { instance.show() }
        instance._selectMenuItem(event); return
      }
      if (!isActive || event.key === SPACE_KEY) { Dropdown.clearMenus() }
    }
  }
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler); EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler); EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus); EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus); EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) { event.preventDefault(); Dropdown.getOrCreateInstance(this).toggle() }); defineJQueryPlugin(Dropdown); const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'; const SELECTOR_STICKY_CONTENT = '.sticky-top'; class ScrollBarHelper {
    constructor() { this._element = document.body }
    getWidth() { const documentWidth = document.documentElement.clientWidth; return Math.abs(window.innerWidth - documentWidth) }
    hide() { const width = this.getWidth(); this._disableOverFlow(); this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width); this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width) }
    _disableOverFlow() { this._saveInitialAttribute(this._element, 'overflow'); this._element.style.overflow = 'hidden' }
    _setElementAttributes(selector, styleProp, callback) {
      const scrollbarWidth = this.getWidth(); const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) { return }
        this._saveInitialAttribute(element, styleProp); const calculatedValue = window.getComputedStyle(element)[styleProp]; element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`
      }; this._applyManipulationCallback(selector, manipulationCallBack)
    }
    reset() { this._resetElementAttributes(this._element, 'overflow'); this._resetElementAttributes(this._element, 'paddingRight'); this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight'); this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight') }
    _saveInitialAttribute(element, styleProp) { const actualValue = element.style[styleProp]; if (actualValue) { Manipulator.setDataAttribute(element, styleProp, actualValue) } }
    _resetElementAttributes(selector, styleProp) { const manipulationCallBack = element => { const value = Manipulator.getDataAttribute(element, styleProp); if (typeof value === 'undefined') { element.style.removeProperty(styleProp) } else { Manipulator.removeDataAttribute(element, styleProp); element.style[styleProp] = value } }; this._applyManipulationCallback(selector, manipulationCallBack) }
    _applyManipulationCallback(selector, callBack) { if (isElement(selector)) { callBack(selector) } else { SelectorEngine.find(selector, this._element).forEach(callBack) } }
    isOverflowing() { return this.getWidth() > 0 }
  }
  const Default$7 = { className: 'modal-backdrop', isVisible: !0, isAnimated: !1, rootElement: 'body', clickCallback: null }; const DefaultType$7 = { className: 'string', isVisible: 'boolean', isAnimated: 'boolean', rootElement: '(element|string)', clickCallback: '(function|null)' }; const NAME$8 = 'backdrop'; const CLASS_NAME_FADE$4 = 'fade'; const CLASS_NAME_SHOW$5 = 'show'; const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`; class Backdrop {
    constructor(config) { this._config = this._getConfig(config); this._isAppended = !1; this._element = null }
    show(callback) {
      if (!this._config.isVisible) { execute(callback); return }
      this._append(); if (this._config.isAnimated) { reflow(this._getElement()) }
      this._getElement().classList.add(CLASS_NAME_SHOW$5); this._emulateAnimation(() => { execute(callback) })
    }
    hide(callback) {
      if (!this._config.isVisible) { execute(callback); return }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5); this._emulateAnimation(() => { this.dispose(); execute(callback) })
    }
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div'); backdrop.className = this._config.className; if (this._config.isAnimated) { backdrop.classList.add(CLASS_NAME_FADE$4) }
        this._element = backdrop
      }
      return this._element
    }
    _getConfig(config) { config = { ...Default$7, ...(typeof config === 'object' ? config : {}) }; config.rootElement = getElement(config.rootElement); typeCheckConfig(NAME$8, config, DefaultType$7); return config }
    _append() {
      if (this._isAppended) { return }
      this._config.rootElement.append(this._getElement()); EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => { execute(this._config.clickCallback) }); this._isAppended = !0
    }
    dispose() {
      if (!this._isAppended) { return }
      EventHandler.off(this._element, EVENT_MOUSEDOWN); this._element.remove(); this._isAppended = !1
    }
    _emulateAnimation(callback) { executeAfterTransition(callback, this._getElement(), this._config.isAnimated) }
  }
  const Default$6 = { trapElement: null, autofocus: !0 }; const DefaultType$6 = { trapElement: 'element', autofocus: 'boolean' }; const NAME$7 = 'focustrap'; const DATA_KEY$7 = 'bs.focustrap'; const EVENT_KEY$7 = `.${DATA_KEY$7}`; const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`; const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`; const TAB_KEY = 'Tab'; const TAB_NAV_FORWARD = 'forward'; const TAB_NAV_BACKWARD = 'backward'; class FocusTrap {
    constructor(config) { this._config = this._getConfig(config); this._isActive = !1; this._lastTabNavDirection = null }
    activate() {
      const { trapElement, autofocus } = this._config; if (this._isActive) { return }
      if (autofocus) { trapElement.focus() }
      EventHandler.off(document, EVENT_KEY$7); EventHandler.on(document, EVENT_FOCUSIN$1, event => this._handleFocusin(event)); EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event)); this._isActive = !0
    }
    deactivate() {
      if (!this._isActive) { return }
      this._isActive = !1; EventHandler.off(document, EVENT_KEY$7)
    }
    _handleFocusin(event) {
      const { target } = event; const { trapElement } = this._config; if (target === document || target === trapElement || trapElement.contains(target)) { return }
      const elements = SelectorEngine.focusableChildren(trapElement); if (elements.length === 0) { trapElement.focus() } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) { elements[elements.length - 1].focus() } else { elements[0].focus() }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) { return }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD
    }
    _getConfig(config) { config = { ...Default$6, ...(typeof config === 'object' ? config : {}) }; typeCheckConfig(NAME$7, config, DefaultType$6); return config }
  }
  const NAME$6 = 'modal'; const DATA_KEY$6 = 'bs.modal'; const EVENT_KEY$6 = `.${DATA_KEY$6}`; const DATA_API_KEY$3 = '.data-api'; const ESCAPE_KEY$1 = 'Escape'; const Default$5 = { backdrop: !0, keyboard: !0, focus: !0 }; const DefaultType$5 = { backdrop: '(boolean|string)', keyboard: 'boolean', focus: 'boolean' }; const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`; const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`; const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`; const EVENT_SHOW$3 = `show${EVENT_KEY$6}`; const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`; const EVENT_RESIZE = `resize${EVENT_KEY$6}`; const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`; const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`; const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`; const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`; const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`; const CLASS_NAME_OPEN = 'modal-open'; const CLASS_NAME_FADE$3 = 'fade'; const CLASS_NAME_SHOW$4 = 'show'; const CLASS_NAME_STATIC = 'modal-static'; const OPEN_SELECTOR$1 = '.modal.show'; const SELECTOR_DIALOG = '.modal-dialog'; const SELECTOR_MODAL_BODY = '.modal-body'; const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]'; class Modal extends BaseComponent {
    constructor(element, config) { super(element); this._config = this._getConfig(config); this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element); this._backdrop = this._initializeBackDrop(); this._focustrap = this._initializeFocusTrap(); this._isShown = !1; this._ignoreBackdropClick = !1; this._isTransitioning = !1; this._scrollBar = new ScrollBarHelper() }
    static get Default() { return Default$5 }
    static get NAME() { return NAME$6 }
    toggle(relatedTarget) { return this._isShown ? this.hide() : this.show(relatedTarget) }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) { return }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, { relatedTarget }); if (showEvent.defaultPrevented) { return }
      this._isShown = !0; if (this._isAnimated()) { this._isTransitioning = !0 }
      this._scrollBar.hide(); document.body.classList.add(CLASS_NAME_OPEN); this._adjustDialog(); this._setEscapeEvent(); this._setResizeEvent(); EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => { EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => { if (event.target === this._element) { this._ignoreBackdropClick = !0 } }) }); this._showBackdrop(() => this._showElement(relatedTarget))
    }
    hide() {
      if (!this._isShown || this._isTransitioning) { return }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3); if (hideEvent.defaultPrevented) { return }
      this._isShown = !1; const isAnimated = this._isAnimated(); if (isAnimated) { this._isTransitioning = !0 }
      this._setEscapeEvent(); this._setResizeEvent(); this._focustrap.deactivate(); this._element.classList.remove(CLASS_NAME_SHOW$4); EventHandler.off(this._element, EVENT_CLICK_DISMISS); EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS); this._queueCallback(() => this._hideModal(), this._element, isAnimated)
    }
    dispose() { [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6)); this._backdrop.dispose(); this._focustrap.deactivate(); super.dispose() }
    handleUpdate() { this._adjustDialog() }
    _initializeBackDrop() { return new Backdrop({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() }) }
    _initializeFocusTrap() { return new FocusTrap({ trapElement: this._element }) }
    _getConfig(config) { config = { ...Default$5, ...Manipulator.getDataAttributes(this._element), ...(typeof config === 'object' ? config : {}) }; typeCheckConfig(NAME$6, config, DefaultType$5); return config }
    _showElement(relatedTarget) {
      const isAnimated = this._isAnimated(); const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog); if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) { document.body.append(this._element) }
      this._element.style.display = 'block'; this._element.removeAttribute('aria-hidden'); this._element.setAttribute('aria-modal', !0); this._element.setAttribute('role', 'dialog'); this._element.scrollTop = 0; if (modalBody) { modalBody.scrollTop = 0 }
      if (isAnimated) { reflow(this._element) }
      this._element.classList.add(CLASS_NAME_SHOW$4); const transitionComplete = () => {
        if (this._config.focus) { this._focustrap.activate() }
        this._isTransitioning = !1; EventHandler.trigger(this._element, EVENT_SHOWN$3, { relatedTarget })
      }; this._queueCallback(transitionComplete, this._dialog, isAnimated)
    }
    _setEscapeEvent() { if (this._isShown) { EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => { if (this._config.keyboard && event.key === ESCAPE_KEY$1) { event.preventDefault(); this.hide() } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) { this._triggerBackdropTransition() } }) } else { EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1) } }
    _setResizeEvent() { if (this._isShown) { EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog()) } else { EventHandler.off(window, EVENT_RESIZE) } }
    _hideModal() { this._element.style.display = 'none'; this._element.setAttribute('aria-hidden', !0); this._element.removeAttribute('aria-modal'); this._element.removeAttribute('role'); this._isTransitioning = !1; this._backdrop.hide(() => { document.body.classList.remove(CLASS_NAME_OPEN); this._resetAdjustments(); this._scrollBar.reset(); EventHandler.trigger(this._element, EVENT_HIDDEN$3) }) }
    _showBackdrop(callback) {
      EventHandler.on(this._element, EVENT_CLICK_DISMISS, event => {
        if (this._ignoreBackdropClick) { this._ignoreBackdropClick = !1; return }
        if (event.target !== event.currentTarget) { return }
        if (this._config.backdrop === !0) { this.hide() } else if (this._config.backdrop === 'static') { this._triggerBackdropTransition() }
      }); this._backdrop.show(callback)
    }
    _isAnimated() { return this._element.classList.contains(CLASS_NAME_FADE$3) }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED); if (hideEvent.defaultPrevented) { return }
      const { classList, scrollHeight, style } = this._element; const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) { return }
      if (!isModalOverflowing) { style.overflowY = 'hidden' }
      classList.add(CLASS_NAME_STATIC); this._queueCallback(() => { classList.remove(CLASS_NAME_STATIC); if (!isModalOverflowing) { this._queueCallback(() => { style.overflowY = '' }, this._dialog) } }, this._dialog); this._element.focus()
    }
    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight; const scrollbarWidth = this._scrollBar.getWidth(); const isBodyOverflowing = scrollbarWidth > 0; if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) { this._element.style.paddingLeft = `${scrollbarWidth}px` }
      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) { this._element.style.paddingRight = `${scrollbarWidth}px` }
    }
    _resetAdjustments() { this._element.style.paddingLeft = ''; this._element.style.paddingRight = '' }
    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config); if (typeof config !== 'string') { return }
        if (typeof data[config] === 'undefined') { throw new TypeError(`No method named "${config}"`) }
        data[config](relatedTarget)
      })
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this); if (['A', 'AREA'].includes(this.tagName)) { event.preventDefault() }
    EventHandler.one(target, EVENT_SHOW$3, showEvent => {
      if (showEvent.defaultPrevented) { return }
      EventHandler.one(target, EVENT_HIDDEN$3, () => { if (isVisible(this)) { this.focus() } })
    }); const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1); if (allReadyOpen) { Modal.getInstance(allReadyOpen).hide() }
    const data = Modal.getOrCreateInstance(target); data.toggle(this)
  }); enableDismissTrigger(Modal); defineJQueryPlugin(Modal); const NAME$5 = 'offcanvas'; const DATA_KEY$5 = 'bs.offcanvas'; const EVENT_KEY$5 = `.${DATA_KEY$5}`; const DATA_API_KEY$2 = '.data-api'; const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`; const ESCAPE_KEY = 'Escape'; const Default$4 = { backdrop: !0, keyboard: !0, scroll: !1 }; const DefaultType$4 = { backdrop: 'boolean', keyboard: 'boolean', scroll: 'boolean' }; const CLASS_NAME_SHOW$3 = 'show'; const CLASS_NAME_BACKDROP = 'offcanvas-backdrop'; const OPEN_SELECTOR = '.offcanvas.show'; const EVENT_SHOW$2 = `show${EVENT_KEY$5}`; const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`; const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`; const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`; const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`; const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`; const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]'; class Offcanvas extends BaseComponent {
    constructor(element, config) { super(element); this._config = this._getConfig(config); this._isShown = !1; this._backdrop = this._initializeBackDrop(); this._focustrap = this._initializeFocusTrap(); this._addEventListeners() }
    static get NAME() { return NAME$5 }
    static get Default() { return Default$4 }
    toggle(relatedTarget) { return this._isShown ? this.hide() : this.show(relatedTarget) }
    show(relatedTarget) {
      if (this._isShown) { return }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, { relatedTarget }); if (showEvent.defaultPrevented) { return }
      this._isShown = !0; this._element.style.visibility = 'visible'; this._backdrop.show(); if (!this._config.scroll) { new ScrollBarHelper().hide() }
      this._element.removeAttribute('aria-hidden'); this._element.setAttribute('aria-modal', !0); this._element.setAttribute('role', 'dialog'); this._element.classList.add(CLASS_NAME_SHOW$3); const completeCallBack = () => {
        if (!this._config.scroll) { this._focustrap.activate() }
        EventHandler.trigger(this._element, EVENT_SHOWN$2, { relatedTarget })
      }; this._queueCallback(completeCallBack, this._element, !0)
    }
    hide() {
      if (!this._isShown) { return }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2); if (hideEvent.defaultPrevented) { return }
      this._focustrap.deactivate(); this._element.blur(); this._isShown = !1; this._element.classList.remove(CLASS_NAME_SHOW$3); this._backdrop.hide(); const completeCallback = () => {
        this._element.setAttribute('aria-hidden', !0); this._element.removeAttribute('aria-modal'); this._element.removeAttribute('role'); this._element.style.visibility = 'hidden'; if (!this._config.scroll) { new ScrollBarHelper().reset() }
        EventHandler.trigger(this._element, EVENT_HIDDEN$2)
      }; this._queueCallback(completeCallback, this._element, !0)
    }
    dispose() { this._backdrop.dispose(); this._focustrap.deactivate(); super.dispose() }
    _getConfig(config) { config = { ...Default$4, ...Manipulator.getDataAttributes(this._element), ...(typeof config === 'object' ? config : {}) }; typeCheckConfig(NAME$5, config, DefaultType$4); return config }
    _initializeBackDrop() { return new Backdrop({ className: CLASS_NAME_BACKDROP, isVisible: this._config.backdrop, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: () => this.hide() }) }
    _initializeFocusTrap() { return new FocusTrap({ trapElement: this._element }) }
    _addEventListeners() { EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => { if (this._config.keyboard && event.key === ESCAPE_KEY) { this.hide() } }) }
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config); if (typeof config !== 'string') { return }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') { throw new TypeError(`No method named "${config}"`) }
        data[config](this)
      })
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this); if (['A', 'AREA'].includes(this.tagName)) { event.preventDefault() }
    if (isDisabled(this)) { return }
    EventHandler.one(target, EVENT_HIDDEN$2, () => { if (isVisible(this)) { this.focus() } }); const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR); if (allReadyOpen && allReadyOpen !== target) { Offcanvas.getInstance(allReadyOpen).hide() }
    const data = Offcanvas.getOrCreateInstance(target); data.toggle(this)
  }); EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show())); enableDismissTrigger(Offcanvas); defineJQueryPlugin(Offcanvas); const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']); const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i; const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i; const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i; const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase(); if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) { return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue)) }
      return !0
    }
    const regExp = allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp); for (let i = 0, len = regExp.length; i < len; i++) { if (regExp[i].test(attributeName)) { return !0 } }
    return !1
  }; const DefaultAllowlist = { '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN], a: ['target', 'href', 'title', 'rel'], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ['src', 'srcset', 'alt', 'title', 'width', 'height'], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }; function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    if (!unsafeHtml.length) { return unsafeHtml }
    if (sanitizeFn && typeof sanitizeFn === 'function') { return sanitizeFn(unsafeHtml) }
    const domParser = new window.DOMParser(); const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html'); const elements = [].concat(...createdDocument.body.querySelectorAll('*')); for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i]; const elementName = element.nodeName.toLowerCase(); if (!Object.keys(allowList).includes(elementName)) { element.remove(); continue }
      const attributeList = [].concat(...element.attributes); const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []); attributeList.forEach(attribute => { if (!allowedAttribute(attribute, allowedAttributes)) { element.removeAttribute(attribute.nodeName) } })
    }
    return createdDocument.body.innerHTML
  }
  const index_umd = { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas }; return index_umd
}))