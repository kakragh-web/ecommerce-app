// Advanced Analytics and Tracking
class AnalyticsManager {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = localStorage.getItem('user_id') || this.generateUserId();
        this.events = [];
        this.init();
    }

    init() {
        this.trackPageView();
        this.bindEvents();
        this.startSessionTracking();
        localStorage.setItem('user_id', this.userId);
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackPageView() {
        const pageData = {
            event: 'page_view',
            page_title: document.title,
            page_url: window.location.href,
            page_path: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            user_id: this.userId
        };

        this.sendEvent(pageData);
    }

    trackEvent(eventName, eventData = {}) {
        const event = {
            event: eventName,
            ...eventData,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            user_id: this.userId,
            page_url: window.location.href
        };

        this.events.push(event);
        this.sendEvent(event);
    }

    trackProductView(productId, productName, productPrice, productCategory) {
        this.trackEvent('product_view', {
            product_id: productId,
            product_name: productName,
            product_price: productPrice,
            product_category: productCategory
        });
    }

    trackAddToCart(productId, productName, productPrice, quantity) {
        this.trackEvent('add_to_cart', {
            product_id: productId,
            product_name: productName,
            product_price: productPrice,
            quantity: quantity,
            value: productPrice * quantity
        });
    }

    trackRemoveFromCart(productId, productName, productPrice, quantity) {
        this.trackEvent('remove_from_cart', {
            product_id: productId,
            product_name: productName,
            product_price: productPrice,
            quantity: quantity,
            value: productPrice * quantity
        });
    }

    trackPurchase(orderId, orderValue, items) {
        this.trackEvent('purchase', {
            transaction_id: orderId,
            value: orderValue,
            currency: 'USD',
            items: items
        });

        // Google Analytics Enhanced Ecommerce
        if (typeof gtag !== 'undefined') {
            gtag('event', 'purchase', {
                transaction_id: orderId,
                value: orderValue,
                currency: 'USD',
                items: items.map(item => ({
                    item_id: item.product_id,
                    item_name: item.product_name,
                    category: item.product_category,
                    quantity: item.quantity,
                    price: item.product_price
                }))
            });
        }
    }

    trackSearch(searchTerm, resultsCount) {
        this.trackEvent('search', {
            search_term: searchTerm,
            results_count: resultsCount
        });
    }

    trackUserEngagement() {
        const engagementData = {
            time_on_page: this.getTimeOnPage(),
            scroll_depth: this.getScrollDepth(),
            clicks: this.getClickCount(),
            page_interactions: this.getPageInteractions()
        };

        this.trackEvent('user_engagement', engagementData);
    }

    bindEvents() {
        // Track clicks
        document.addEventListener('click', (e) => {
            this.trackClick(e);
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.trackFormSubmission(e);
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.trackEvent('scroll_depth', { depth: maxScroll });
                }
            }
        });

        // Track time on page before leaving
        window.addEventListener('beforeunload', () => {
            this.trackUserEngagement();
        });

        // Track visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackEvent('page_hidden');
            } else {
                this.trackEvent('page_visible');
            }
        });
    }

    trackClick(event) {
        const element = event.target;
        const clickData = {
            element_tag: element.tagName.toLowerCase(),
            element_class: element.className,
            element_id: element.id,
            element_text: element.textContent?.substring(0, 100),
            click_x: event.clientX,
            click_y: event.clientY
        };

        // Track specific button clicks
        if (element.classList.contains('buy-btn')) {
            this.trackEvent('buy_button_click', clickData);
        } else if (element.classList.contains('add-to-cart')) {
            this.trackEvent('add_to_cart_click', clickData);
        } else if (element.tagName === 'A') {
            this.trackEvent('link_click', {
                ...clickData,
                link_url: element.href
            });
        }
    }

    trackFormSubmission(event) {
        const form = event.target;
        const formData = {
            form_id: form.id,
            form_class: form.className,
            form_action: form.action,
            form_method: form.method
        };

        this.trackEvent('form_submission', formData);
    }

    getTimeOnPage() {
        return Date.now() - this.pageLoadTime;
    }

    getScrollDepth() {
        return Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    }

    getClickCount() {
        return this.events.filter(event => event.event.includes('click')).length;
    }

    getPageInteractions() {
        return this.events.filter(event => 
            ['click', 'scroll', 'form_submission'].some(type => event.event.includes(type))
        ).length;
    }

    startSessionTracking() {
        this.pageLoadTime = Date.now();
        
        // Send heartbeat every 30 seconds
        setInterval(() => {
            this.trackEvent('heartbeat', {
                time_on_page: this.getTimeOnPage(),
                scroll_depth: this.getScrollDepth()
            });
        }, 30000);
    }

    sendEvent(eventData) {
        // Store events locally
        const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        storedEvents.push(eventData);
        localStorage.setItem('analytics_events', JSON.stringify(storedEvents.slice(-100))); // Keep last 100 events

        // Send to analytics service (replace with your actual endpoint)
        if (navigator.onLine) {
            this.sendToAnalyticsService(eventData);
        } else {
            // Queue for later if offline
            this.queueOfflineEvent(eventData);
        }

        // Console log for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics Event:', eventData);
        }
    }

    async sendToAnalyticsService(eventData) {
        try {
            // Replace with your actual analytics endpoint
            const response = await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                throw new Error('Analytics request failed');
            }
        } catch (error) {
            console.warn('Failed to send analytics event:', error);
            this.queueOfflineEvent(eventData);
        }
    }

    queueOfflineEvent(eventData) {
        const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics_events') || '[]');
        offlineEvents.push(eventData);
        localStorage.setItem('offline_analytics_events', JSON.stringify(offlineEvents));
    }

    sendOfflineEvents() {
        const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics_events') || '[]');
        if (offlineEvents.length > 0) {
            offlineEvents.forEach(event => {
                this.sendToAnalyticsService(event);
            });
            localStorage.removeItem('offline_analytics_events');
        }
    }

    // A/B Testing functionality
    getABTestVariant(testName, variants) {
        const userId = this.userId;
        const hash = this.hashCode(userId + testName);
        const variantIndex = Math.abs(hash) % variants.length;
        const variant = variants[variantIndex];

        this.trackEvent('ab_test_assignment', {
            test_name: testName,
            variant: variant
        });

        return variant;
    }

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    // Heatmap data collection
    collectHeatmapData() {
        const heatmapData = {
            clicks: this.events.filter(e => e.event.includes('click')).map(e => ({
                x: e.click_x,
                y: e.click_y,
                timestamp: e.timestamp
            })),
            scrolls: this.events.filter(e => e.event === 'scroll_depth'),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            page_height: document.body.scrollHeight
        };

        return heatmapData;
    }

    // Performance monitoring
    trackPerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const performanceData = {
                page_load_time: navigation.loadEventEnd - navigation.fetchStart,
                dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
                first_paint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
            };

            this.trackEvent('performance_metrics', performanceData);
        }
    }

    // Error tracking
    trackError(error, context = {}) {
        const errorData = {
            error_message: error.message,
            error_stack: error.stack,
            error_line: error.lineno,
            error_column: error.colno,
            error_filename: error.filename,
            user_agent: navigator.userAgent,
            url: window.location.href,
            ...context
        };

        this.trackEvent('javascript_error', errorData);
    }
}

// Initialize analytics
let analytics;
document.addEventListener('DOMContentLoaded', () => {
    analytics = new AnalyticsManager();
    
    // Track performance after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            analytics.trackPerformance();
        }, 1000);
    });

    // Track JavaScript errors
    window.addEventListener('error', (event) => {
        analytics.trackError(event.error || event, {
            event_type: 'window_error'
        });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        analytics.trackError(new Error(event.reason), {
            event_type: 'unhandled_promise_rejection'
        });
    });

    // Send offline events when back online
    window.addEventListener('online', () => {
        analytics.sendOfflineEvents();
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}