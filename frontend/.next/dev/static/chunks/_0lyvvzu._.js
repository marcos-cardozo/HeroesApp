(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (token) {
                router.push('/dashboard');
            } else {
                router.push('/login');
            }
        }
    }["Home.useEffect"], [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-zinc-400",
                    children: "Cargando..."
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Home, "vQduR7x+OPXj6PSmJyFnf+hU7bg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getAuthToken",
    ()=>getAuthToken,
    "portalApi",
    ()=>portalApi,
    "removeAuthToken",
    ()=>removeAuthToken,
    "setAuthToken",
    ()=>setAuthToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
'use client';
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});
// Request interceptor: add auth token
api.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error)=>Promise.reject(error));
const redirectToLogin = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const loginUrl = new URL('/login', window.location.origin).toString();
        window.location.assign(loginUrl);
    }
};
// Response interceptor: handle 401
api.interceptors.response.use((response)=>response, (error)=>{
    if (error.response?.status === 401 && ("TURBOPACK compile-time value", "object") !== 'undefined') {
        localStorage.removeItem('accessToken');
        redirectToLogin();
    }
    return Promise.reject(error);
});
const authApi = {
    register: async (data)=>{
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    login: async (data)=>{
        const response = await api.post('/auth/login', data);
        return response.data;
    },
    getProfile: async ()=>{
        const response = await api.get('/auth/profile');
        return response.data;
    }
};
const portalApi = {
    getAll: async ()=>{
        const response = await api.get('/portal');
        return response.data;
    },
    // Mood Board
    getMoodBoard: async ()=>{
        const response = await api.get('/portal/mood-board');
        return response.data;
    },
    addMoodBoardImage: async (imageUrl, order)=>{
        const response = await api.post('/portal/mood-board', {
            imageUrl,
            order
        });
        return response.data;
    },
    updateMoodBoardImage: async (id, data)=>{
        const response = await api.patch(`/portal/mood-board/${id}`, data);
        return response.data;
    },
    deleteMoodBoardImage: async (id)=>{
        await api.delete(`/portal/mood-board/${id}`);
    },
    // Beliefs
    getBeliefs: async ()=>{
        const response = await api.get('/portal/beliefs');
        return response.data;
    },
    addBelief: async (text, order)=>{
        const response = await api.post('/portal/beliefs', {
            text,
            order
        });
        return response.data;
    },
    updateBelief: async (id, data)=>{
        const response = await api.patch(`/portal/beliefs/${id}`, data);
        return response.data;
    },
    deleteBelief: async (id)=>{
        await api.delete(`/portal/beliefs/${id}`);
    },
    // Slides
    getSlides: async ()=>{
        const response = await api.get('/portal/slides');
        console.log('Slides fetched:', response.data);
        return response.data;
    },
    createSlide: async (title, narrativeText, order)=>{
        const response = await api.post('/portal/slides', {
            title,
            narrativeText,
            order
        });
        return response.data;
    },
    updateSlide: async (id, data)=>{
        const response = await api.patch(`/portal/slides/${id}`, data);
        return response.data;
    },
    deleteSlide: async (id)=>{
        await api.delete(`/portal/slides/${id}`);
    },
    addSlideImage: async (slideId, imageUrl, order)=>{
        const response = await api.post(`/portal/slides/${slideId}/images`, {
            imageUrl,
            order
        });
        return response.data;
    },
    deleteSlideImage: async (slideId, imageId)=>{
        await api.delete(`/portal/slides/${slideId}/images/${imageId}`);
    },
    // Narrative
    getNarrative: async ()=>{
        const response = await api.get('/portal/narrative');
        return response.data;
    },
    upsertNarrative: async (text)=>{
        const response = await api.put('/portal/narrative', {
            text
        });
        return response.data;
    }
};
const setAuthToken = (token)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem('accessToken', token);
    }
};
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return localStorage.getItem('accessToken');
    }
    //TURBOPACK unreachable
    ;
};
const removeAuthToken = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem('accessToken');
    }
};
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0lyvvzu._.js.map