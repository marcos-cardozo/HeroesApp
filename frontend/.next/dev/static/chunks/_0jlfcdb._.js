(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/portal/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$to$2d$image$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html-to-image/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AuthGuard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
// Importaciones para Drag & Drop
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature();
/* eslint-disable @typescript-eslint/no-explicit-any */ "use client";
;
;
;
;
;
;
;
;
;
/* eslint-disable @next/next/no-img-element */ /* ---------------- MODAL DE LINK ---------------- */ function LinkModal({ onClose, onSubmit, returnFocusRef, title = "AGREGAR LINK", submitLabel = "Agregar al mood board", submitLabelSaving = "Agregando...", errorMessage = "No se pudo agregar la imagen. Intentá de nuevo.", initialValue = "" }) {
    _s();
    const [link, setLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const firstFieldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleSave = async ()=>{
        const trimmed = link.trim();
        if (!trimmed || saving) return;
        setSaving(true);
        setError(null);
        try {
            await onSubmit(trimmed);
            onClose();
        } catch  {
            setError(errorMessage);
        } finally{
            setSaving(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LinkModal.useEffect": ()=>{
            const raf = requestAnimationFrame({
                "LinkModal.useEffect.raf": ()=>setMounted(true)
            }["LinkModal.useEffect.raf"]);
            return ({
                "LinkModal.useEffect": ()=>cancelAnimationFrame(raf)
            })["LinkModal.useEffect"];
        }
    }["LinkModal.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LinkModal.useEffect": ()=>{
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            firstFieldRef.current?.focus();
            const handleEsc = {
                "LinkModal.useEffect.handleEsc": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["LinkModal.useEffect.handleEsc"];
            document.addEventListener("keydown", handleEsc);
            return ({
                "LinkModal.useEffect": ()=>{
                    document.body.style.overflow = previousOverflow;
                    document.removeEventListener("keydown", handleEsc);
                    const target = returnFocusRef?.current ?? document.activeElement;
                    target?.focus?.();
                }
            })["LinkModal.useEffect"];
        }
    }["LinkModal.useEffect"], [
        onClose,
        returnFocusRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed! inset-0! z-[9999]! flex items-center justify-center p-4",
        style: {
            background: "rgba(0,0,0,.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            opacity: mounted ? 1 : 0,
            transition: "opacity .18s"
        },
        onClick: (e)=>{
            if (e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: panelRef,
            className: "quest-panel relative w-full max-w-2xl rounded-2xl! p-4 sm:p-6 md:p-8",
            style: {
                border: "1px solid var(--gold-dim)",
                transform: mounted ? "scale(1)" : "scale(.96)",
                opacity: mounted ? 1 : 0,
                transition: "all .18s",
                maxHeight: "90vh",
                overflow: "auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bracket-tl"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bracket-tr"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bracket-bl"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bracket-br"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4 sm:mb-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-mono text-xs sm:text-sm tracking-[0.2em] uppercase",
                            style: {
                                color: "var(--gold)"
                            },
                            children: [
                                "— ",
                                title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "group relative text-sm px-3 py-2 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer",
                            style: {
                                color: "var(--parchment-muted)"
                            },
                            "aria-label": "Cerrar",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                    style: {
                                        background: "rgba(255, 68, 68, 0.15)",
                                        boxShadow: "0 0 20px rgba(255, 68, 68, 0.3)",
                                        border: "1px solid rgba(255, 68, 68, 0.4)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ref: firstFieldRef,
                    value: link,
                    onChange: (e)=>setLink(e.target.value),
                    onKeyDown: (e)=>e.key === "Enter" && handleSave(),
                    placeholder: "https://...",
                    className: "quest-input w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl! text-sm sm:text-base mb-4 sm:mb-6"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm mb-4 sm:mb-5",
                    style: {
                        color: "var(--blood)"
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 178,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row justify-end gap-2 sm:gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: saving || !link.trim(),
                        className: "quest-btn-retro cursor-pointer w-full sm:w-auto",
                        children: saving ? submitLabelSaving : submitLabel
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/portal/page.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s(LinkModal, "mxySx6RhFMXkGrUA4egnUgOVyos=");
_c = LinkModal;
/* ---------------- MODAL DE CREACIÓN DE SLIDE ---------------- */ function CreateSlideModalContent({ slides, setSlides, onClose, onCreated }) {
    _s1();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const firstInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Array(4).fill(null));
    const [activeSlot, setActiveSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const SLIDE_CATEGORIES = [
        "YO",
        "PROPOSITO",
        "PAREJA",
        "TEMPLO",
        "AMIGOS",
        "HOBBIES"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateSlideModalContent.useEffect": ()=>{
            const raf = requestAnimationFrame({
                "CreateSlideModalContent.useEffect.raf": ()=>setMounted(true)
            }["CreateSlideModalContent.useEffect.raf"]);
            return ({
                "CreateSlideModalContent.useEffect": ()=>cancelAnimationFrame(raf)
            })["CreateSlideModalContent.useEffect"];
        }
    }["CreateSlideModalContent.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateSlideModalContent.useEffect": ()=>{
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            setTimeout({
                "CreateSlideModalContent.useEffect": ()=>firstInputRef.current?.focus()
            }["CreateSlideModalContent.useEffect"], 100);
            const handleEsc = {
                "CreateSlideModalContent.useEffect.handleEsc": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["CreateSlideModalContent.useEffect.handleEsc"];
            document.addEventListener("keydown", handleEsc);
            return ({
                "CreateSlideModalContent.useEffect": ()=>{
                    document.body.style.overflow = previousOverflow;
                    document.removeEventListener("keydown", handleEsc);
                }
            })["CreateSlideModalContent.useEffect"];
        }
    }["CreateSlideModalContent.useEffect"], [
        onClose
    ]);
    const handleCreate = async ()=>{
        if (!category) {
            setError("Seleccioná una categoría.");
            return;
        }
        if (!text.trim()) {
            setError("El texto narrativo es requerido.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].createSlide(category, text.trim(), slides.length);
            for(let i = 0; i < images.length; i++){
                if (images[i]) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].addSlideImage(created.id, images[i], i);
                }
            }
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].getSlides();
            setSlides(updated);
            onCreated(created.id);
            onClose();
        } catch (err) {
            setError(err?.response?.data?.message?.[0] ?? "No se pudo crear la slide.");
        } finally{
            setSaving(false);
        }
    };
    const handleAddImage = async (url)=>{
        if (activeSlot !== null) {
            const copy = [
                ...images
            ];
            copy[activeSlot] = url;
            setImages(copy);
            setActiveSlot(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: panelRef,
        className: "quest-panel relative w-full max-w-3xl rounded-2xl! p-4 sm:p-6",
        style: {
            border: "1px solid var(--gold-dim)",
            transform: mounted ? "scale(1)" : "scale(.96)",
            opacity: mounted ? 1 : 0,
            transition: "all .18s",
            maxHeight: "90vh",
            overflow: "auto"
        },
        onClick: (e)=>e.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-tl"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-tr"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-bl"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-br"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4 sm:mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-mono text-xs sm:text-sm tracking-[0.2em] uppercase",
                        style: {
                            color: "var(--gold)"
                        },
                        children: "— NUEVA SLIDE"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "group relative text-sm px-3 py-2 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer",
                        style: {
                            color: "var(--parchment-muted)"
                        },
                        "aria-label": "Cerrar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-10",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                style: {
                                    background: "rgba(255, 68, 68, 0.15)",
                                    boxShadow: "0 0 20px rgba(255, 68, 68, 0.3)",
                                    border: "1px solid rgba(255, 68, 68, 0.4)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row gap-4 lg:gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-mono text-xs tracking-widest mb-1.5",
                                style: {
                                    color: "var(--parchment-muted)"
                                },
                                children: "CATEGORÍA"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                ref: firstInputRef,
                                value: category,
                                onChange: (e)=>setCategory(e.target.value),
                                className: "quest-input w-full px-3 py-2 rounded-2xl! mb-4 text-sm cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Seleccionar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/portal/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    SLIDE_CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: cat
                                        }, cat, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-mono text-xs tracking-widest mb-1.5",
                                style: {
                                    color: "var(--parchment-muted)"
                                },
                                children: "TEXTO NARRATIVO"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: text,
                                onChange: (e)=>setText(e.target.value),
                                className: "quest-input w-full px-3 py-2 rounded-2xl! min-h-48 resize-none text-sm scrollbar-violet",
                                placeholder: "Escribí la narrativa..."
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3 w-full lg:w-64 shrink-0",
                        children: Array.from({
                            length: 4
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setActiveSlot(i),
                                className: "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
                                style: {
                                    background: "#131315",
                                    border: "1px solid #232326"
                                },
                                children: images[i] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: images[i],
                                            alt: "",
                                            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                const copy = [
                                                    ...images
                                                ];
                                                copy[i] = null;
                                                setImages(copy);
                                            },
                                            className: "absolute top-1.5 right-1.5 z-20 h-5 w-5 sm:h-6 sm:w-6 rounded-full text-[10px] sm:text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:rotate-90",
                                            style: {
                                                background: "var(--blood)",
                                                color: "#fff"
                                            },
                                            "aria-label": "Eliminar imagen",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                                            style: {
                                                background: "linear-gradient(to top, rgba(0,0,0,.8), transparent)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[8px] sm:text-[10px] uppercase",
                                                style: {
                                                    color: "#F2F0EB"
                                                },
                                                children: "Reemplazar"
                                            }, void 0, false, {
                                                fileName: "[project]/app/portal/page.tsx",
                                                lineNumber: 417,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full flex flex-col items-center justify-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl sm:text-2xl",
                                            style: {
                                                color: "#7C6CFF"
                                            },
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 427,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[10px] uppercase",
                                            style: {
                                                color: "#8A8A8F"
                                            },
                                            children: "Agregar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 426,
                                    columnNumber: 17
                                }, this)
                            }, i, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm mt-4",
                style: {
                    color: "var(--blood)"
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 447,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "group relative px-5 py-2.5 text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto",
                        style: {
                            color: "var(--parchment-muted)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-10",
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                                style: {
                                    background: "rgba(255, 200, 50, 0.08)",
                                    border: "1px solid rgba(255, 200, 50, 0.3)",
                                    boxShadow: "0 4px 12px rgba(255, 200, 50, 0.1)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 459,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCreate,
                        disabled: saving,
                        className: "quest-btn-retro quest-btn-retro-small cursor-pointer w-full sm:w-auto",
                        children: saving ? "Creando..." : "Crear slide"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 452,
                columnNumber: 7
            }, this),
            activeSlot !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed! inset-0! z-[99999]! flex items-center justify-center p-4",
                style: {
                    background: "rgba(0,0,0,.65)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)"
                },
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setActiveSlot(null);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkModal, {
                    title: "AGREGAR IMAGEN",
                    submitLabel: "Agregar imagen",
                    submitLabelSaving: "Agregando...",
                    errorMessage: "No se pudo agregar la imagen.",
                    onClose: ()=>setActiveSlot(null),
                    onSubmit: handleAddImage
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 491,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 480,
                columnNumber: 11
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_s1(CreateSlideModalContent, "wT++FgDjg4DH0K5HEdU/aekdnsE=");
_c1 = CreateSlideModalContent;
/* ---------------- COMPONENTE PARA ÍTEMS ARRASTRABLES ---------------- */ function SortableBeliefItem({ belief, index, onEdit, onDelete, isEditing, draft, setDraft, commitEdit }) {
    _s2();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id: belief.id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        ref: setNodeRef,
        style: style,
        className: `flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl transition-colors ${isDragging ? "ring-2 ring-violet-500" : ""}`,
        ...attributes,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...listeners,
                className: "cursor-grab active:cursor-grabbing text-base sm:text-lg select-none hover:text-gold transition-colors flex-shrink-0",
                style: {
                    color: "var(--parchment-muted)"
                },
                title: "Arrastrar para reordenar",
                children: "⋮⋮"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 550,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-display w-5 sm:w-6 text-right flex-shrink-0 text-sm sm:text-base",
                style: {
                    color: "var(--gold)"
                },
                children: [
                    index + 1,
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 559,
                columnNumber: 7
            }, this),
            isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                autoFocus: true,
                type: "text",
                value: draft,
                onChange: (e)=>setDraft(e.target.value),
                onBlur: ()=>commitEdit(belief),
                onKeyDown: (e)=>{
                    if (e.key === "Enter") {
                        e.preventDefault();
                        e.target.blur();
                    }
                },
                className: "quest-input flex-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-xs sm:text-sm"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 567,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                onClick: ()=>onEdit(belief),
                className: "flex-1 cursor-text px-1 py-1 text-xs sm:text-sm",
                style: {
                    color: "var(--parchment)"
                },
                children: belief.text || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: "var(--parchment-muted)"
                    },
                    children: "(vacío — click para editar)"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 588,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 582,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onDelete(belief.id),
                className: "group relative text-xs sm:text-sm px-1.5 sm:px-2 py-1 rounded-xl flex-shrink-0 transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer",
                style: {
                    color: "var(--blood)"
                },
                "aria-label": "Eliminar creencia",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative z-10",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 602,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        style: {
                            background: "rgba(255, 68, 68, 0.1)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 603,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 595,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 542,
        columnNumber: 5
    }, this);
}
_s2(SortableBeliefItem, "iTIyvp0X9kMGpdHRsWsr2+tGbVI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c2 = SortableBeliefItem;
/* ---------------- SECCIÓN 2 — 10 CREENCIAS CLAVE (CON DRAG & DROP) ---------------- */ function BeliefsSection({ beliefs, setBeliefs }) {
    _s3();
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newText, setNewText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 5
        }
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const startEdit = (b)=>{
        setEditingId(b.id);
        setDraft(b.text);
    };
    const commitEdit = async (b)=>{
        const text = draft.trim();
        setEditingId(null);
        if (text === "" || text === b.text) return;
        setBeliefs((prev)=>prev.map((it)=>it.id === b.id ? {
                    ...it,
                    text
                } : it));
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].updateBelief(b.id, {
                text
            });
        } catch  {
        /* ignore */ }
    };
    const handleDelete = async (id)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].deleteBelief(id);
            setBeliefs((prev)=>prev.filter((it)=>it.id !== id));
        } catch  {
        /* ignore */ }
    };
    const handleAdd = async (e)=>{
        e.preventDefault();
        const text = newText.trim();
        if (!text) return;
        setAdding(true);
        try {
            const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].addBelief(text, beliefs.length);
            setBeliefs((prev)=>[
                    ...prev,
                    created
                ]);
            setNewText("");
        } catch  {
        /* ignore */ } finally{
            setAdding(false);
        }
    };
    const handleDragEnd = async (event)=>{
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = beliefs.findIndex((item)=>item.id === active.id);
            const newIndex = beliefs.findIndex((item)=>item.id === over.id);
            const newOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(beliefs, oldIndex, newIndex);
            setBeliefs(newOrder);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].reorderBeliefs?.(newOrder.map((item)=>item.id));
            } catch  {
                setBeliefs((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(newOrder, newIndex, oldIndex));
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "portal-glow p-2 -m-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm sm:text-base tracking-[0.2em] uppercase",
                        style: {
                            color: "var(--gold)"
                        },
                        children: "— 10 CREENCIAS CLAVE"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 705,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-xs px-3 py-1 rounded-full",
                            style: {
                                background: "rgba(124,108,255,0.15)",
                                border: "1px solid rgba(124,108,255,0.2)",
                                color: "var(--gold)"
                            },
                            children: [
                                beliefs.length,
                                "/10"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 713,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 712,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 704,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                sensors: sensors,
                collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                    items: beliefs.map((b)=>b.id),
                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "space-y-1.5 sm:space-y-2",
                        children: beliefs.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableBeliefItem, {
                                belief: b,
                                index: i,
                                onEdit: startEdit,
                                onDelete: handleDelete,
                                isEditing: editingId === b.id,
                                draft: draft,
                                setDraft: setDraft,
                                commitEdit: commitEdit
                            }, b.id, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 737,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 735,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 731,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 726,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleAdd,
                className: "flex flex-col sm:flex-row gap-2 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: newText,
                        onChange: (e)=>setNewText(e.target.value),
                        placeholder: "Nueva creencia",
                        className: "quest-input flex-1 px-4 py-2 rounded-2xl! text-sm",
                        disabled: beliefs.length >= 10
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 757,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: adding || beliefs.length >= 10,
                        className: "quest-btn-retro quest-btn-retro-small cursor-pointer w-full sm:w-auto",
                        children: beliefs.length >= 10 ? "Completo ✓" : "Agregar"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 765,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 753,
                columnNumber: 7
            }, this),
            beliefs.length >= 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs mt-2 text-center sm:text-left",
                style: {
                    color: "var(--gold)"
                },
                children: "✦ Has completado las 10 creencias clave"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 775,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 703,
        columnNumber: 5
    }, this);
}
_s3(BeliefsSection, "zjwYs+zBJkV99YlIZ6szqYIqm7Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c3 = BeliefsSection;
/* ---------------- SECCIÓN 1 — MOOD BOARD ---------------- */ const TOTAL_SLOTS = 8;
function MoodBoardSection({ moodBoard, setMoodBoard }) {
    _s4();
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const linkButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showNotification, setShowNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [linkModalTarget, setLinkModalTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MoodBoardSection.useEffect": ()=>{
            if (showNotification) {
                const timer = setTimeout({
                    "MoodBoardSection.useEffect.timer": ()=>{
                        setShowNotification(false);
                    }
                }["MoodBoardSection.useEffect.timer"], 2000);
                return ({
                    "MoodBoardSection.useEffect": ()=>clearTimeout(timer)
                })["MoodBoardSection.useEffect"];
            }
        }
    }["MoodBoardSection.useEffect"], [
        showNotification
    ]);
    // 🔥 FUNCIÓN DE DESCARGA SIMPLIFICADA (SIN FETCH A PINTEREST)
    const handleDownload = async ()=>{
        if (!gridRef.current) return;
        // 🔥 RESPALDO Y SOBRESCRITURA DEFINITIVA DE console.error
        const originalConsoleError = console.error;
        console.error = (...args)=>{
            const errorString = JSON.stringify(args);
            // Ignoramos cualquier error que hable de "fetch", "CORS", "pinterest" o "cross-origin"
            if (errorString.includes("fetch") || errorString.includes("CORS") || errorString.includes("pinterest") || errorString.includes("cross-origin") || errorString.includes("ERR_FAILED")) {
                return;
            }
            originalConsoleError(...args);
        };
        try {
            // Clonamos el nodo para no modificar el original
            const cloneNode = gridRef.current.cloneNode(true);
            // Eliminamos botones y overlays del clon
            cloneNode.querySelectorAll(".z-20, .z-10").forEach((el)=>el.remove());
            // Aplicamos estilos para que se vea bien
            cloneNode.style.backgroundColor = "#0b0a10";
            cloneNode.style.padding = "0px";
            // Generamos el PNG
            const dataUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$to$2d$image$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPng"])(cloneNode, {
                cacheBust: true,
                skipAutoScale: true,
                pixelRatio: 2,
                style: {
                    borderRadius: "0px"
                },
                filter: (node)=>{
                    return !node.classList?.contains("z-20") && !node.classList?.contains("z-10");
                }
            });
            // Descargamos el archivo
            const link = document.createElement("a");
            link.download = "mood-board.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            // Solo mostramos errores que no sean de CORS
            if (!String(error).includes("CORS") && !String(error).includes("fetch")) {
                console.error("Error al descargar la imagen:", error);
            }
        } finally{
            // Restauramos el console.error original
            console.error = originalConsoleError;
        }
    };
    const handleDelete = async (id)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].deleteMoodBoardImage(id);
            setMoodBoard((prev)=>prev.filter((img)=>img.id !== id));
        } catch  {
        /* ignore */ }
    };
    const handleAddImage = async (url, order)=>{
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].addMoodBoardImage(url, order);
        setMoodBoard((prev)=>[
                ...prev,
                created
            ]);
        if (moodBoard.length + 1 >= TOTAL_SLOTS) {
            setShowNotification(true);
        }
    };
    const handleReplaceImage = async (id, url)=>{
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].updateMoodBoardImage(id, {
            imageUrl: url
        });
        setMoodBoard((prev)=>prev.map((it)=>it.id === id ? updated : it));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "portal-glow p-2 -m-2 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm sm:text-base tracking-[0.2em] uppercase",
                        style: {
                            color: "var(--gold)"
                        },
                        children: "— MOOD BOARD"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 901,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs px-3 py-1 rounded-full transition-all duration-300",
                                style: {
                                    background: moodBoard.length >= TOTAL_SLOTS ? "rgba(50, 255, 150, 0.15)" : "rgba(124,108,255,0.15)",
                                    border: moodBoard.length >= TOTAL_SLOTS ? "1px solid rgba(50, 255, 150, 0.3)" : "1px solid rgba(124,108,255,0.2)",
                                    color: moodBoard.length >= TOTAL_SLOTS ? "#32FF96" : "var(--gold)",
                                    transform: `scale(${moodBoard.length >= TOTAL_SLOTS ? 1.05 : 1})`
                                },
                                children: [
                                    moodBoard.length,
                                    "/",
                                    TOTAL_SLOTS
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 909,
                                columnNumber: 11
                            }, this),
                            moodBoard.length >= TOTAL_SLOTS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs px-3 py-1 rounded-full",
                                style: {
                                    background: "rgba(50, 255, 150, 0.1)",
                                    border: "1px solid rgba(50, 255, 150, 0.2)",
                                    color: "#32FF96"
                                },
                                children: "✓ Completo"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 929,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: linkButtonRef,
                                type: "button",
                                onClick: handleDownload,
                                className: "quest-btn-retro quest-btn-retro-small cursor-pointer text-xs sm:text-sm",
                                children: "Descargar PNG"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 941,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 907,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 900,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: gridRef,
                className: "grid grid-cols-4 gap-2 sm:gap-4",
                children: Array.from({
                    length: TOTAL_SLOTS
                }).map((_, index)=>{
                    const img = moodBoard[index];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(124,108,255,0.35)]",
                        children: img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: img.imageUrl,
                                    alt: "",
                                    className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110",
                                    style: {
                                        border: "1px solid #232326"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 964,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleDelete(img.id),
                                    className: "absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full text-[8px] sm:text-xs font-bold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer hover:rotate-90",
                                    style: {
                                        background: "var(--blood)",
                                        color: "#fff"
                                    },
                                    "aria-label": "Eliminar imagen",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 970,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-10 flex items-end justify-center pb-2 sm:pb-3 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                                    style: {
                                        background: "linear-gradient(to top, rgba(10,10,11,0.8), rgba(10,10,11,0) 55%)"
                                    },
                                    onClick: ()=>setLinkModalTarget({
                                            mode: "replace",
                                            id: img.id
                                        }),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-xs tracking-widest uppercase",
                                        style: {
                                            color: "#F2F0EB"
                                        },
                                        children: "Reemplazar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/portal/page.tsx",
                                        lineNumber: 989,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 979,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 963,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full w-full flex flex-col items-center justify-center cursor-pointer transition-colors rounded-xl sm:rounded-2xl",
                            style: {
                                background: "#131315",
                                border: "1px solid #232326",
                                color: "#8A8A8F"
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.borderColor = "#7C6CFF",
                            onMouseLeave: (e)=>e.currentTarget.style.borderColor = "#232326",
                            onClick: ()=>setLinkModalTarget({
                                    mode: "add",
                                    order: index
                                }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl sm:text-3xl mb-1 sm:mb-1.5",
                                    style: {
                                        color: "#7C6CFF"
                                    },
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1015,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[8px] sm:text-xs tracking-widest uppercase text-center px-1",
                                    children: "Agregar imagen"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1021,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 998,
                            columnNumber: 17
                        }, this)
                    }, index, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 958,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 953,
                columnNumber: 7
            }, this),
            showNotification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-[99999] animate-slide-up",
                style: {
                    background: "rgba(50, 255, 150, 0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(50, 255, 150, 0.15)",
                    borderRadius: "16px",
                    padding: "12px 20px sm:p-4 sm:px-8",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 sm:gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg sm:text-xl",
                            children: "✨"
                        }, void 0, false, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1046,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-xs sm:text-sm tracking-widest uppercase",
                                    style: {
                                        color: "#32FF96"
                                    },
                                    children: "¡Mood Board completo!"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1048,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] sm:text-xs mt-0.5",
                                    style: {
                                        color: "var(--parchment-muted)"
                                    },
                                    children: "Eliminá una imagen para agregar otra"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1054,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1047,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowNotification(false),
                            className: "text-sm opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0",
                            style: {
                                color: "var(--parchment-muted)"
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1061,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1045,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1033,
                columnNumber: 9
            }, this),
            linkModalTarget?.mode === "add" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkModal, {
                onClose: ()=>setLinkModalTarget(null),
                returnFocusRef: linkButtonRef,
                title: "AGREGAR LINK",
                submitLabel: "Agregar al mood board",
                submitLabelSaving: "Agregando...",
                errorMessage: "No se pudo agregar la imagen. Intentá de nuevo.",
                onSubmit: async (url)=>{
                    await handleAddImage(url, linkModalTarget.order);
                }
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1073,
                columnNumber: 9
            }, this),
            linkModalTarget?.mode === "replace" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkModal, {
                onClose: ()=>setLinkModalTarget(null),
                title: "REEMPLAZAR IMAGEN",
                submitLabel: "Reemplazar imagen",
                submitLabelSaving: "Reemplazando...",
                errorMessage: "No se pudo reemplazar la imagen. Intentá de nuevo.",
                onSubmit: async (url)=>{
                    await handleReplaceImage(linkModalTarget.id, url);
                }
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1086,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 899,
        columnNumber: 5
    }, this);
}
_s4(MoodBoardSection, "69eScqqUUqQAQPcL8+nq90nYurY=");
_c4 = MoodBoardSection;
/* ---------------- SECCIÓN 3 — SLIDES ---------------- */ function SlidesSection({ slides, setSlides }) {
    _s5();
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCreate, setShowCreate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const MAX_SLIDES = 6; // 🔥 Límite 6
    const selectedSlide = slides.find((s)=>s.id === selectedId) ?? null;
    const handleDelete = async (id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].deleteSlide(id);
        setSlides((prev)=>prev.filter((s)=>s.id !== id));
        if (selectedId === id) setSelectedId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "portal-glow relative p-2 -m-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm sm:text-base tracking-[0.2em] uppercase",
                        style: {
                            color: "var(--gold)"
                        },
                        children: "— SLIDES"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs px-3 py-1 rounded-full transition-all duration-300",
                                style: {
                                    background: slides.length >= MAX_SLIDES ? "rgba(50, 255, 150, 0.15)" : "rgba(124,108,255,0.15)",
                                    border: slides.length >= MAX_SLIDES ? "1px solid rgba(50, 255, 150, 0.3)" : "1px solid rgba(124,108,255,0.2)",
                                    color: slides.length >= MAX_SLIDES ? "#32FF96" : "var(--gold)",
                                    transform: `scale(${slides.length >= MAX_SLIDES ? 1.05 : 1})`
                                },
                                children: [
                                    slides.length,
                                    "/",
                                    MAX_SLIDES
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1132,
                                columnNumber: 11
                            }, this),
                            slides.length < MAX_SLIDES && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCreate(true),
                                className: "quest-btn-retro quest-btn-retro-small cursor-pointer text-xs sm:text-sm",
                                children: "+ Agregar"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1151,
                                columnNumber: 13
                            }, this),
                            slides.length >= MAX_SLIDES && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs px-3 py-1 rounded-full",
                                style: {
                                    background: "rgba(50, 255, 150, 0.1)",
                                    border: "1px solid rgba(50, 255, 150, 0.2)",
                                    color: "#32FF96"
                                },
                                children: "✓ Completo"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1160,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1123,
                columnNumber: 7
            }, this),
            slides.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm",
                style: {
                    color: "var(--parchment-muted)"
                },
                children: "Todavía no agregaste ninguna slide."
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1175,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4",
                        children: slides.map((slide)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedId(slide.id),
                                className: `cursor-pointer ${selectedId === slide.id ? "ring-2 ring-violet-500 rounded-xl sm:rounded-2xl" : ""}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SlideCardCompact, {
                                    slide: slide,
                                    onOpen: ()=>setSelectedId(slide.id),
                                    onDelete: ()=>handleDelete(slide.id)
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1191,
                                    columnNumber: 17
                                }, this)
                            }, slide.id, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1182,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1180,
                        columnNumber: 11
                    }, this),
                    slides.length >= MAX_SLIDES && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center animate-pulse-slow",
                        style: {
                            background: "rgba(50, 255, 150, 0.03)",
                            border: "1px solid rgba(50, 255, 150, 0.08)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs sm:text-sm font-mono tracking-widest uppercase",
                                style: {
                                    color: "#32FF96"
                                },
                                children: "✦ ¡Todas las slides completadas! ✦"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1208,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] sm:text-xs mt-1",
                                style: {
                                    color: "var(--parchment-muted)"
                                },
                                children: "Eliminá una slide para agregar otra"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1214,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1201,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1179,
                columnNumber: 9
            }, this),
            showCreate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed! inset-0! z-[9999]! flex items-center justify-center p-4",
                style: {
                    background: "rgba(0,0,0,.65)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)"
                },
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setShowCreate(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateSlideModalContent, {
                    slides: slides,
                    setSlides: setSlides,
                    onClose: ()=>setShowCreate(false),
                    onCreated: (id)=>setSelectedId(id)
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1238,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1227,
                columnNumber: 11
            }, this), document.body),
            selectedSlide && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
                style: {
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)"
                },
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setSelectedId(null);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SlideDetailModal, {
                    slide: selectedSlide,
                    onClose: ()=>setSelectedId(null),
                    setSlides: setSlides
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1261,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1250,
                columnNumber: 11
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 1122,
        columnNumber: 5
    }, this);
}
_s5(SlidesSection, "cnl7qs1zPHebeujWn9hE5JO+6Zw=");
_c5 = SlidesSection;
function SlideDetailModal({ slide, onClose, returnFocusRef, setSlides }) {
    _s6();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SlideDetailModal.useEffect": ()=>{
            const raf = requestAnimationFrame({
                "SlideDetailModal.useEffect.raf": ()=>setMounted(true)
            }["SlideDetailModal.useEffect.raf"]);
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            const handleEsc = {
                "SlideDetailModal.useEffect.handleEsc": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["SlideDetailModal.useEffect.handleEsc"];
            document.addEventListener("keydown", handleEsc);
            return ({
                "SlideDetailModal.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    document.removeEventListener("keydown", handleEsc);
                    document.body.style.overflow = previousOverflow;
                    const target = returnFocusRef?.current ?? document.activeElement;
                    target?.focus?.();
                }
            })["SlideDetailModal.useEffect"];
        }
    }["SlideDetailModal.useEffect"], [
        onClose,
        returnFocusRef
    ]);
    const patchSlide = (data)=>{
        setSlides((prev)=>prev.map((s)=>s.id === slide.id ? {
                    ...s,
                    ...data
                } : s));
    };
    const handleTitleBlur = async (value)=>{
        if (value === (slide.title ?? "")) return;
        patchSlide({
            title: value
        });
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].updateSlide(slide.id, {
                title: value
            });
        } catch  {
        /* ignore */ }
    };
    const handleNarrativeBlur = async (value)=>{
        if (value === (slide.narrativeText ?? "")) return;
        patchSlide({
            narrativeText: value
        });
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].updateSlide(slide.id, {
                narrativeText: value
            });
        } catch  {
        /* ignore */ }
    };
    const handleDeleteImage = async (imageId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].deleteSlideImage(slide.id, imageId);
            patchSlide({
                images: slide.images.filter((im)=>im.id !== imageId)
            });
        } catch  {
        /* ignore */ }
    };
    const handleAddImage = async (url, order, existingId)=>{
        const trimmed = url.trim();
        if (!trimmed) return;
        try {
            if (existingId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].deleteSlideImage(slide.id, existingId);
            }
            const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].addSlideImage(slide.id, trimmed, order);
            patchSlide({
                images: [
                    ...slide.images.filter((im)=>im.id !== existingId),
                    created
                ]
            });
        } catch  {
        /* ignore */ }
    };
    const images = [
        ...slide.images ?? []
    ].sort((a, b)=>a.order - b.order);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: panelRef,
        role: "dialog",
        "aria-modal": "true",
        className: "quest-panel relative w-full max-w-2xl rounded-2xl! p-4 sm:p-6",
        style: {
            border: "1px solid var(--gold-dim)",
            transform: mounted ? "scale(1)" : "scale(.96)",
            opacity: mounted ? 1 : 0,
            transition: "all .18s",
            background: "linear-gradient(180deg, rgba(12,11,15,0.98), rgba(8,7,10,0.98))",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            maxHeight: "90vh",
            overflow: "auto"
        },
        onClick: (e)=>e.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-tl",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-tr",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1386,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-bl",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bracket-br",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4 sm:mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-mono text-xs sm:text-sm tracking-[0.2em] uppercase",
                        style: {
                            color: "var(--gold)"
                        },
                        children: "— EDITAR SLIDE"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "group relative text-sm px-3 py-2 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer",
                        style: {
                            color: "var(--parchment-muted)"
                        },
                        "aria-label": "Cerrar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-10",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1404,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                style: {
                                    background: "rgba(255, 68, 68, 0.15)",
                                    boxShadow: "0 0 20px rgba(255, 68, 68, 0.3)",
                                    border: "1px solid rgba(255, 68, 68, 0.4)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1405,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1398,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row gap-4 sm:gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                autoFocus: true,
                                type: "text",
                                defaultValue: slide.title ?? "",
                                onBlur: (e)=>handleTitleBlur(e.target.value),
                                placeholder: "Título de tu slide",
                                className: "quest-input w-full px-3 py-2 rounded-2xl mb-3 text-sm font-semibold"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1418,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                defaultValue: slide.narrativeText ?? "",
                                onBlur: (e)=>handleNarrativeBlur(e.target.value),
                                placeholder: "Texto de tu slide...",
                                className: "quest-input w-full px-3 py-2 rounded-2xl min-h-48 sm:min-h-72 resize-none text-sm scrollbar-violet"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1427,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 w-full sm:w-80 shrink-0",
                        children: Array.from({
                            length: 4
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SlideImageSlot, {
                                image: images[i],
                                order: i,
                                onAdd: (url)=>handleAddImage(url, i, images[i]?.id),
                                onDelete: images[i] ? ()=>handleDeleteImage(images[i].id) : undefined
                            }, images[i]?.id ?? `empty-${i}`, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1437,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1435,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1416,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 1367,
        columnNumber: 5
    }, this);
}
_s6(SlideDetailModal, "G2s2EQV5NBXvEQHgvRaTU9MvEh0=");
_c6 = SlideDetailModal;
function SlideImageSlot({ image, onAdd, onDelete }) {
    _s7();
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const commit = ()=>{
        if (url.trim()) onAdd(url.trim());
        setUrl("");
        setEditing(false);
    };
    if (image) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group relative aspect-square rounded-lg sm:rounded-xl overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: image.imageUrl,
                    alt: "",
                    className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110",
                    style: {
                        border: "1px solid #232326"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1475,
                    columnNumber: 9
                }, this),
                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onDelete,
                    className: "absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full text-[8px] sm:text-[10px] font-bold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer hover:rotate-90",
                    style: {
                        background: "var(--blood)",
                        color: "#fff"
                    },
                    "aria-label": "Eliminar imagen",
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1482,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 z-10 flex items-end justify-center pb-1.5 sm:pb-2 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    style: {
                        background: "linear-gradient(to top, rgba(10,10,11,0.8), rgba(10,10,11,0) 55%)"
                    },
                    onClick: ()=>setEditing(true),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[8px] sm:text-[10px] tracking-widest uppercase",
                        style: {
                            color: "#F2F0EB"
                        },
                        children: "Reemplazar"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1500,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1492,
                    columnNumber: 9
                }, this),
                editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 z-30 flex flex-col gap-1.5 p-2 justify-center",
                    style: {
                        background: "rgba(10,10,11,0.92)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            autoFocus: true,
                            type: "url",
                            value: url,
                            onChange: (e)=>setUrl(e.target.value),
                            onKeyDown: (e)=>e.key === "Enter" && commit(),
                            placeholder: "https://...",
                            className: "quest-input w-full px-2 py-1 rounded-lg! text-[8px] sm:text-[10px]"
                        }, void 0, false, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1512,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: commit,
                                    className: "quest-btn flex-1 px-1 py-1 rounded-lg! text-[8px] sm:text-[10px] font-semibold cursor-pointer",
                                    children: "OK"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1522,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setEditing(false);
                                        setUrl("");
                                    },
                                    className: "group relative px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer",
                                    style: {
                                        color: "var(--parchment-muted)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative z-10",
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 1538,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                            style: {
                                                background: "rgba(255, 68, 68, 0.1)",
                                                border: "1px solid rgba(255, 68, 68, 0.3)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/portal/page.tsx",
                                            lineNumber: 1539,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1529,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1521,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1508,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/portal/page.tsx",
            lineNumber: 1474,
            columnNumber: 7
        }, this);
    }
    if (editing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "aspect-square rounded-lg sm:rounded-xl flex flex-col gap-1.5 p-2 justify-center",
            style: {
                background: "rgba(10,10,11,0.92)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    autoFocus: true,
                    type: "url",
                    value: url,
                    onChange: (e)=>setUrl(e.target.value),
                    onKeyDown: (e)=>e.key === "Enter" && commit(),
                    placeholder: "https://...",
                    className: "quest-input w-full px-2 py-1 rounded-lg! text-[8px] sm:text-[10px]"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1560,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: commit,
                            className: "quest-btn flex-1 px-1 py-1 rounded-lg! text-[8px] sm:text-[10px] font-semibold cursor-pointer",
                            children: "OK"
                        }, void 0, false, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1570,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setEditing(false);
                                setUrl("");
                            },
                            className: "group relative px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer",
                            style: {
                                color: "var(--parchment-muted)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative z-10",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1586,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                    style: {
                                        background: "rgba(255, 68, 68, 0.1)",
                                        border: "1px solid rgba(255, 68, 68, 0.3)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1587,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1577,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1569,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/portal/page.tsx",
            lineNumber: 1556,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "aspect-square rounded-lg sm:rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors",
        style: {
            background: "#131315",
            border: "1px solid #232326",
            color: "#8A8A8F"
        },
        onMouseEnter: (e)=>e.currentTarget.style.borderColor = "#7C6CFF",
        onMouseLeave: (e)=>e.currentTarget.style.borderColor = "#232326",
        onClick: ()=>setEditing(true),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-base sm:text-xl mb-0.5",
                style: {
                    color: "#7C6CFF"
                },
                children: "+"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-[7px] sm:text-[9px] tracking-widest uppercase",
                children: "img"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1618,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 1601,
        columnNumber: 5
    }, this);
}
_s7(SlideImageSlot, "e01ZZiQzPVkQoVVXpbCVkkAzbe8=");
_c7 = SlideImageSlot;
function SlideCardCompact({ slide, onOpen, onDelete }) {
    const images = [
        ...slide.images ?? []
    ].sort((a, b)=>a.order - b.order);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(124,108,255,0.35)]",
        style: {
            background: "#131315",
            border: "1px solid #232326"
        },
        onClick: onOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: (e)=>{
                    e.stopPropagation();
                    onDelete();
                },
                className: "absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full text-[8px] sm:text-xs font-bold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer hover:rotate-90",
                style: {
                    background: "var(--blood)",
                    color: "#fff"
                },
                "aria-label": "Eliminar slide",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1642,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col h-full p-2 sm:p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[8px] sm:text-xs tracking-widest uppercase mb-1.5 sm:mb-2 truncate",
                        style: {
                            color: "var(--parchment)"
                        },
                        children: slide.title?.trim() || "Sin título"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1656,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 grid-rows-2 gap-1 sm:gap-1.5 flex-1",
                        children: Array.from({
                            length: 4
                        }).map((_, i)=>{
                            const im = images[i];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative rounded-md overflow-hidden",
                                style: {
                                    background: "#1a1a1d"
                                },
                                children: im && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: im.imageUrl,
                                    alt: "",
                                    className: "absolute inset-0 h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/portal/page.tsx",
                                    lineNumber: 1672,
                                    columnNumber: 19
                                }, this)
                            }, i, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1666,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1662,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1655,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                style: {
                    background: "rgba(10,10,11,0.55)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-[8px] sm:text-xs tracking-widest uppercase",
                    style: {
                        color: "#F2F0EB"
                    },
                    children: "Ver slide"
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1688,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1684,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 1637,
        columnNumber: 5
    }, this);
}
_c8 = SlideCardCompact;
/* ---------------- SECCIÓN 4 — PORTAL (narrativa final con modo lectura/edición) ---------------- */ function NarrativeSection({ narrative, setNarrative }) {
    _s8();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "NarrativeSection.useState": ()=>narrative?.text ?? ""
    }["NarrativeSection.useState"]);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!narrative?.text);
    const handleSave = async ()=>{
        setSaving(true);
        setSaved(false);
        try {
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].upsertNarrative(text);
            setNarrative(updated);
            setText(updated.text ?? "");
            setSaved(true);
            setIsEditing(false);
            setTimeout(()=>setSaved(false), 2000);
        } catch  {
        /* ignore */ } finally{
            setSaving(false);
        }
    };
    const handleEdit = ()=>{
        setIsEditing(true);
    };
    const handleCancel = ()=>{
        setText(narrative?.text ?? "");
        setIsEditing(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "portal-glow p-2 -m-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm sm:text-base tracking-[0.2em] uppercase",
                        style: {
                            color: "var(--gold)"
                        },
                        children: "— PORTAL"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1741,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-xs px-3 py-1 rounded-full",
                            style: {
                                background: isEditing ? "rgba(255, 200, 50, 0.15)" : "rgba(50, 255, 150, 0.15)",
                                border: isEditing ? "1px solid rgba(255, 200, 50, 0.3)" : "1px solid rgba(50, 255, 150, 0.3)",
                                color: isEditing ? "#FFC832" : "#32FF96"
                            },
                            children: isEditing ? "✎ Editando" : "✓ Listo"
                        }, void 0, false, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1749,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1748,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1740,
                columnNumber: 7
            }, this),
            isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        placeholder: "Escribí la narrativa final del portal...",
                        className: "quest-input w-full px-4 py-3 rounded-sm text-sm min-h-48 sm:min-h-64 resize-none overflow-y-auto scrollbar-violet",
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1768,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleSave,
                                disabled: saving,
                                className: "quest-btn-retro quest-btn-retro-small cursor-pointer w-full sm:w-auto",
                                children: saving ? "Guardando..." : "Guardar"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1777,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCancel,
                                className: "group relative px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto",
                                style: {
                                    color: "var(--parchment-muted)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative z-10",
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/portal/page.tsx",
                                        lineNumber: 1792,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300",
                                        style: {
                                            background: "rgba(255, 200, 50, 0.08)",
                                            border: "1px solid rgba(255, 200, 50, 0.3)",
                                            boxShadow: "0 4px 12px rgba(255, 200, 50, 0.1)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/portal/page.tsx",
                                        lineNumber: 1793,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1786,
                                columnNumber: 13
                            }, this),
                            saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                style: {
                                    color: "var(--gold)"
                                },
                                children: "✓ Guardado"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1804,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1776,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1767,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative p-4 sm:p-6 rounded-2xl min-h-48 sm:min-h-64",
                        style: {
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prose prose-invert max-w-none text-sm leading-relaxed",
                                style: {
                                    color: "var(--parchment)",
                                    fontFamily: "var(--font-body)"
                                },
                                children: text.split("\n").map((paragraph, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 last:mb-0",
                                        children: paragraph || "\u00A0"
                                    }, index, false, {
                                        fileName: "[project]/app/portal/page.tsx",
                                        lineNumber: 1828,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1820,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-1 -left-1 w-3 h-3 sm:w-4 sm:h-4",
                                style: {
                                    borderTop: "2px solid var(--gold-dim)",
                                    borderLeft: "2px solid var(--gold-dim)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1834,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4",
                                style: {
                                    borderTop: "2px solid var(--gold-dim)",
                                    borderRight: "2px solid var(--gold-dim)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1841,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -bottom-1 -left-1 w-3 h-3 sm:w-4 sm:h-4",
                                style: {
                                    borderBottom: "2px solid var(--gold-dim)",
                                    borderLeft: "2px solid var(--gold-dim)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1848,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4",
                                style: {
                                    borderBottom: "2px solid var(--gold-dim)",
                                    borderRight: "2px solid var(--gold-dim)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1855,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1813,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl min-h-48 sm:min-h-64",
                        style: {
                            background: "rgba(255, 255, 255, 0.02)",
                            border: "2px dashed rgba(255, 255, 255, 0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-3xl sm:text-4xl mb-3",
                                style: {
                                    color: "var(--gold-dim)"
                                },
                                children: "✦"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1871,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-center",
                                style: {
                                    color: "var(--parchment-muted)"
                                },
                                children: "Todavía no hay narrativa escrita"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1877,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleEdit,
                                className: "quest-btn-retro quest-btn-retro-small mt-4 cursor-pointer",
                                children: "Escribir ahora"
                            }, void 0, false, {
                                fileName: "[project]/app/portal/page.tsx",
                                lineNumber: 1883,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1864,
                        columnNumber: 13
                    }, this),
                    text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleEdit,
                            className: "quest-btn-retro-secondary quest-btn-retro-small cursor-pointer",
                            children: "✎ Editar"
                        }, void 0, false, {
                            fileName: "[project]/app/portal/page.tsx",
                            lineNumber: 1895,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1894,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1811,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 1739,
        columnNumber: 5
    }, this);
}
_s8(NarrativeSection, "AT67Ozm/zkZ183N7XaJB1bYn0vI=");
_c9 = NarrativeSection;
/* ---------------- PORTAL CONTENT ---------------- */ function PortalContent() {
    _s9();
    const [moodBoard, setMoodBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [beliefs, setBeliefs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [slides, setSlides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [narrative, setNarrative] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PortalContent.useEffect": ()=>{
            let active = true;
            const load = {
                "PortalContent.useEffect.load": async ()=>{
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalApi"].getAll();
                        if (!active) return;
                        setMoodBoard([
                            ...data.moodBoard ?? []
                        ].sort({
                            "PortalContent.useEffect.load": (a, b)=>a.order - b.order
                        }["PortalContent.useEffect.load"]));
                        setBeliefs([
                            ...data.beliefs ?? []
                        ].sort({
                            "PortalContent.useEffect.load": (a, b)=>a.order - b.order
                        }["PortalContent.useEffect.load"]));
                        setSlides([
                            ...data.slides ?? []
                        ].sort({
                            "PortalContent.useEffect.load": (a, b)=>a.order - b.order
                        }["PortalContent.useEffect.load"]));
                        setNarrative(data.narrative ?? null);
                    } catch  {
                        if (active) setError("No se pudo cargar el portal. Intentá de nuevo.");
                    } finally{
                        if (active) setIsLoading(false);
                    }
                }
            }["PortalContent.useEffect.load"];
            load();
            return ({
                "PortalContent.useEffect": ()=>{
                    active = false;
                }
            })["PortalContent.useEffect"];
        }
    }["PortalContent.useEffect"], []);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "quest-bg min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppHeader"], {}, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1947,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-32",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin h-12 w-12 rounded-full border-4 border-t-transparent",
                        style: {
                            borderColor: "var(--gold)",
                            borderTopColor: "transparent"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1949,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/portal/page.tsx",
                    lineNumber: 1948,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/portal/page.tsx",
            lineNumber: 1946,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "quest-bg min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppHeader"], {}, void 0, false, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1963,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-sm px-4 py-3 text-sm border mb-6",
                        style: {
                            background: "var(--blood-soft)",
                            borderColor: "var(--blood)",
                            color: "#f0c9c6"
                        },
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1966,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MoodBoardSection, {
                        moodBoard: moodBoard,
                        setMoodBoard: setMoodBoard
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1979,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "quest-divider my-6 sm:my-10"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1981,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SlidesSection, {
                        slides: slides,
                        setSlides: setSlides
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1984,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "quest-divider my-6 sm:my-10"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1986,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BeliefsSection, {
                        beliefs: beliefs,
                        setBeliefs: setBeliefs
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1989,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "quest-divider my-6 sm:my-10"
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1991,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NarrativeSection, {
                        narrative: narrative,
                        setNarrative: setNarrative
                    }, void 0, false, {
                        fileName: "[project]/app/portal/page.tsx",
                        lineNumber: 1994,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portal/page.tsx",
                lineNumber: 1964,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 1962,
        columnNumber: 5
    }, this);
}
_s9(PortalContent, "6jTssl0ckKdojFA0S8rO1zVQGOI=");
_c10 = PortalContent;
function PortalPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthGuard"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PortalContent, {}, void 0, false, {
            fileName: "[project]/app/portal/page.tsx",
            lineNumber: 2003,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/portal/page.tsx",
        lineNumber: 2002,
        columnNumber: 5
    }, this);
}
_c11 = PortalPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "LinkModal");
__turbopack_context__.k.register(_c1, "CreateSlideModalContent");
__turbopack_context__.k.register(_c2, "SortableBeliefItem");
__turbopack_context__.k.register(_c3, "BeliefsSection");
__turbopack_context__.k.register(_c4, "MoodBoardSection");
__turbopack_context__.k.register(_c5, "SlidesSection");
__turbopack_context__.k.register(_c6, "SlideDetailModal");
__turbopack_context__.k.register(_c7, "SlideImageSlot");
__turbopack_context__.k.register(_c8, "SlideCardCompact");
__turbopack_context__.k.register(_c9, "NarrativeSection");
__turbopack_context__.k.register(_c10, "PortalContent");
__turbopack_context__.k.register(_c11, "PortalPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AppHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppHeader",
    ()=>AppHeader,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Habits',
        href: '/habits'
    },
    {
        label: 'Calendar',
        href: '/calendar'
    },
    {
        label: 'Portal',
        href: '/portal'
    },
    {
        label: 'Boss Fight',
        href: '/boss-fight'
    },
    {
        label: 'Checklist',
        href: '/checklist'
    }
];
function AppHeader() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [balanceLoading, setBalanceLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoggingOut, setIsLoggingOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppHeader.useEffect": ()=>{
            let active = true;
            const loadProfile = {
                "AppHeader.useEffect.loadProfile": async ()=>{
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].getProfile();
                        if (active) setUser(data);
                    } catch  {
                        if (active) setUser(null);
                    }
                }
            }["AppHeader.useEffect.loadProfile"];
            const loadBalance = {
                "AppHeader.useEffect.loadBalance": async ()=>{
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/fragments/balance');
                        if (active) setBalance(response.data.balance);
                    } catch  {
                        if (active) setBalance(null);
                    } finally{
                        if (active) setBalanceLoading(false);
                    }
                }
            }["AppHeader.useEffect.loadBalance"];
            loadProfile();
            loadBalance();
            return ({
                "AppHeader.useEffect": ()=>{
                    active = false;
                }
            })["AppHeader.useEffect"];
        }
    }["AppHeader.useEffect"], []);
    // Cerrar menú al cambiar de ruta
    const closeMobileMenu = ()=>setIsMobileMenuOpen(false);
    const handleLogout = ()=>{
        setIsLoggingOut(true);
        localStorage.removeItem('accessToken');
        router.push('/login');
        setIsLoggingOut(false);
        closeMobileMenu();
    };
    const initial = user?.nombre?.trim()?.charAt(0)?.toUpperCase() || '?';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "w-full sticky top-0 z-50",
        style: {
            background: 'var(--panel)',
            borderBottom: '1px solid var(--panel-edge)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-3 sm:px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2 sm:gap-4 py-3 sm:py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-sm sm:text-base md:text-lg lg:text-xl truncate",
                                style: {
                                    color: 'var(--parchment)'
                                },
                                children: [
                                    "Bienvenido, ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--gold)'
                                        },
                                        children: user?.nombre ?? '—'
                                    }, void 0, false, {
                                        fileName: "[project]/components/AppHeader.tsx",
                                        lineNumber: 87,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AppHeader.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AppHeader.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 sm:gap-4 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm",
                                    style: {
                                        color: 'var(--parchment)'
                                    },
                                    title: "Fragmentos",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "16",
                                            height: "16",
                                            className: "sm:w-[18px] sm:h-[18px]",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M6 3h12l3 6-9 12L3 9l3-6Z",
                                                    stroke: "var(--gold)",
                                                    strokeWidth: "1.4",
                                                    strokeLinejoin: "round",
                                                    fill: "rgba(201,164,75,0.18)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AppHeader.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M3 9h18M9 3 12 21 15 3M9 3l3 6 3-6",
                                                    stroke: "var(--gold)",
                                                    strokeWidth: "1",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AppHeader.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AppHeader.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--gold)'
                                            },
                                            className: "font-semibold tabular-nums",
                                            children: balanceLoading || balance === null ? '—' : balance
                                        }, void 0, false, {
                                            fileName: "[project]/components/AppHeader.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AppHeader.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full font-display text-xs sm:text-sm font-semibold select-none flex-shrink-0",
                                    style: {
                                        background: 'var(--gold-dim)',
                                        color: 'var(--gold)',
                                        border: '1px solid var(--gold)'
                                    },
                                    title: user?.nombre ?? '',
                                    children: initial
                                }, void 0, false, {
                                    fileName: "[project]/components/AppHeader.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                                    className: "lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg transition-colors hover:bg-white/5",
                                    "aria-label": "Menú de navegación",
                                    style: {
                                        color: 'var(--parchment)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block w-5 h-0.5 transition-all duration-300",
                                            style: {
                                                background: 'var(--parchment)',
                                                transform: isMobileMenuOpen ? 'rotate(45deg) translateY(2.5px)' : 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AppHeader.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block w-5 h-0.5 transition-all duration-300",
                                            style: {
                                                background: 'var(--parchment)',
                                                opacity: isMobileMenuOpen ? 0 : 1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AppHeader.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block w-5 h-0.5 transition-all duration-300",
                                            style: {
                                                background: 'var(--parchment)',
                                                transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-2.5px)' : 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AppHeader.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AppHeader.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AppHeader.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AppHeader.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "hidden lg:flex items-center gap-1 overflow-x-auto pb-1",
                    children: NAV_ITEMS.map((item)=>{
                        const isActive = pathname === item.href;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: "px-3 py-2 text-sm whitespace-nowrap transition-colors relative",
                            style: {
                                color: isActive ? 'var(--gold)' : 'var(--parchment-muted)'
                            },
                            children: [
                                item.label,
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute bottom-0 left-0 right-0 h-0.5",
                                    style: {
                                        background: 'var(--gold)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/AppHeader.tsx",
                                    lineNumber: 185,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, item.href, true, {
                            fileName: "[project]/components/AppHeader.tsx",
                            lineNumber: 175,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/AppHeader.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex flex-col gap-0.5 pb-3 pt-1 border-t border-white/5",
                        children: [
                            NAV_ITEMS.map((item)=>{
                                const isActive = pathname === item.href;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "px-3 py-2.5 text-sm transition-colors rounded-lg",
                                    style: {
                                        color: isActive ? 'var(--gold)' : 'var(--parchment-muted)',
                                        background: isActive ? 'rgba(124,108,255,0.08)' : 'transparent'
                                    },
                                    children: item.label
                                }, item.href, false, {
                                    fileName: "[project]/components/AppHeader.tsx",
                                    lineNumber: 205,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-white/5 my-2"
                            }, void 0, false, {
                                fileName: "[project]/components/AppHeader.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                disabled: isLoggingOut,
                                className: "px-3 py-2.5 text-sm transition-colors rounded-lg flex items-center gap-2 hover:bg-white/5 w-full",
                                style: {
                                    color: 'var(--blood)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AppHeader.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AppHeader.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this),
                                    isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AppHeader.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AppHeader.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AppHeader.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AppHeader.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AppHeader.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(AppHeader, "QH2eL1F09oPKEc561qD9IEeTBSc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AppHeader;
const __TURBOPACK__default__export__ = AppHeader;
var _c;
__turbopack_context__.k.register(_c, "AppHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AuthGuard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthGuard",
    ()=>AuthGuard
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
function AuthGuard({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }
    }["AuthGuard.useEffect"], [
        router
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/components/AuthGuard.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-zinc-400",
                        children: "Cargando..."
                    }, void 0, false, {
                        fileName: "[project]/components/AuthGuard.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AuthGuard.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/AuthGuard.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/AuthGuard.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, this);
}
_s(AuthGuard, "l9mOnJ2XXArxG69ajpcNCw8SPqI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
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

//# sourceMappingURL=_0jlfcdb._.js.map