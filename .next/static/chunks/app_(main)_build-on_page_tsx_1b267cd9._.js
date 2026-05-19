(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/(main)/build-on/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BuildOnPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Build-on Explorer — shows the full knowledge lineage tree
// Every project that was built on top of another, chained together
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BuildOnPage() {
    _s();
    const [roots, setRoots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [totalChains, setTotalChains] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuildOnPage.useEffect": ()=>{
            async function load() {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // Fetch all build_on relationships
                const { data: buildOns } = await supabase.from('build_ons').select('parent_project_id, child_project_id');
                const relations = buildOns ?? [];
                // Fetch all projects involved in build-ons (parents + children)
                const allIds = new Set();
                relations.forEach({
                    "BuildOnPage.useEffect.load": (r)=>{
                        allIds.add(r.parent_project_id);
                        allIds.add(r.child_project_id);
                    }
                }["BuildOnPage.useEffect.load"]);
                // Also fetch ALL approved projects so we can show standalone ones
                const { data: allProjectsRaw } = await supabase.from('projects').select(`
          id, title, description, thumbnail_url, star_count, semester, submitted_by,
          profiles!projects_submitted_by_fkey(username, avatar_url, full_name),
          project_tags(tags(id, name))
        `).eq('status', 'approved').order('star_count', {
                    ascending: false
                });
                const projectMap = new Map();
                for (const p of allProjectsRaw ?? []){
                    projectMap.set(p.id, {
                        ...p,
                        children: [],
                        depth: 0
                    });
                }
                // Build the tree
                const childIds = new Set(relations.map({
                    "BuildOnPage.useEffect.load": (r)=>r.child_project_id
                }["BuildOnPage.useEffect.load"]));
                // Attach children to parents
                for (const { parent_project_id, child_project_id } of relations){
                    const parent = projectMap.get(parent_project_id);
                    const child = projectMap.get(child_project_id);
                    if (parent && child) {
                        parent.children.push(child);
                    }
                }
                // Root nodes = projects that are parents but not children of anyone
                // OR projects that are children but whose parent isn't in our map
                const rootNodes = [];
                for (const [id, node] of projectMap.entries()){
                    // Is a parent in some chain
                    const isParent = relations.some({
                        "BuildOnPage.useEffect.load.isParent": (r)=>r.parent_project_id === id
                    }["BuildOnPage.useEffect.load.isParent"]);
                    // Is not a child of anyone
                    const isChild = childIds.has(id);
                    if (isParent && !isChild) {
                        rootNodes.push(node);
                    }
                }
                // Set depth recursively
                function setDepth(node, depth) {
                    node.depth = depth;
                    node.children.forEach({
                        "BuildOnPage.useEffect.load.setDepth": (c)=>setDepth(c, depth + 1)
                    }["BuildOnPage.useEffect.load.setDepth"]);
                }
                rootNodes.forEach({
                    "BuildOnPage.useEffect.load": (r)=>setDepth(r, 0)
                }["BuildOnPage.useEffect.load"]);
                setRoots(rootNodes);
                setTotalChains(relations.length);
                // Auto-expand roots
                setExpanded(new Set(rootNodes.map({
                    "BuildOnPage.useEffect.load": (r)=>r.id
                }["BuildOnPage.useEffect.load"])));
                setLoading(false);
            }
            load();
        }
    }["BuildOnPage.useEffect"], []);
    function toggleExpand(id) {
        setExpanded((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }
    // Filter roots by search
    function matchesSearch(node) {
        if (!search) return true;
        const q = search.toLowerCase();
        if (node.title.toLowerCase().includes(q)) return true;
        if (node.children.some((c)=>matchesSearch(c))) return true;
        return false;
    }
    const filtered = roots.filter(matchesSearch);
    // Recursive tree node component
    function TreeNode({ node, isLast }) {
        const hasChildren = node.children.length > 0;
        const isOpen = expanded.has(node.id);
        const tags = node.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 0,
                    position: 'relative'
                },
                children: [
                    node.depth > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 32,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: 20
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                height: 1,
                                background: 'var(--border)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 147,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/build-on/page.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'var(--bg-surface)',
                                    border: `1px solid ${node.depth === 0 ? 'var(--accent)' : 'var(--border-subtle)'}`,
                                    borderRadius: 12,
                                    padding: '14px 16px',
                                    marginBottom: 8,
                                    transition: 'all 0.2s'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 48,
                                                height: 48,
                                                borderRadius: 8,
                                                flexShrink: 0,
                                                background: 'var(--bg-overlay)',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 18,
                                                color: 'var(--text-muted)'
                                            },
                                            children: node.thumbnail_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: node.thumbnail_url,
                                                style: {
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                },
                                                alt: ""
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/build-on/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 23
                                            }, this) : '◫'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 8,
                                                        marginBottom: 4,
                                                        flexWrap: 'wrap'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/projects/${node.id}`,
                                                            style: {
                                                                fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                                fontSize: 18,
                                                                fontWeight: 400,
                                                                color: 'var(--text-primary)',
                                                                lineHeight: 1.2
                                                            },
                                                            children: node.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 21
                                                        }, this),
                                                        node.depth === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 9,
                                                                padding: '2px 8px',
                                                                borderRadius: 99,
                                                                background: 'var(--accent-dim)',
                                                                color: 'var(--accent)',
                                                                fontWeight: 600,
                                                                letterSpacing: '0.08em',
                                                                textTransform: 'uppercase',
                                                                flexShrink: 0
                                                            },
                                                            children: "Origin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 23
                                                        }, this),
                                                        hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 9,
                                                                padding: '2px 8px',
                                                                borderRadius: 99,
                                                                background: 'rgba(74,124,89,0.1)',
                                                                color: 'var(--success)',
                                                                fontWeight: 600,
                                                                letterSpacing: '0.08em',
                                                                textTransform: 'uppercase',
                                                                flexShrink: 0
                                                            },
                                                            children: [
                                                                node.children.length,
                                                                " built on this"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 10,
                                                        flexWrap: 'wrap'
                                                    },
                                                    children: [
                                                        tags.slice(0, 2).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "tag-pill",
                                                                style: {
                                                                    fontSize: 10
                                                                },
                                                                children: t.name
                                                            }, t.id, false, {
                                                                fileName: "[project]/app/(main)/build-on/page.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 23
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: [
                                                                "by @",
                                                                node.profiles?.username
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 21
                                                        }, this),
                                                        node.semester && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: node.semester
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: 'var(--accent)'
                                                            },
                                                            children: [
                                                                "★ ",
                                                                node.star_count
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this),
                                        hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleExpand(node.id),
                                            style: {
                                                width: 28,
                                                height: 28,
                                                borderRadius: 8,
                                                flexShrink: 0,
                                                background: isOpen ? 'var(--accent-dim)' : 'var(--bg-overlay)',
                                                border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border-subtle)'}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 12,
                                                color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s'
                                            },
                                            children: isOpen ? '▾' : '▸'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/build-on/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/build-on/page.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            hasChildren && isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingLeft: 24,
                                    borderLeft: '1px solid var(--border-subtle)',
                                    marginLeft: 24,
                                    marginBottom: 8
                                },
                                children: node.children.map((child, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TreeNode, {
                                        node: child,
                                        isLast: i === node.children.length - 1
                                    }, child.id, false, {
                                        fileName: "[project]/app/(main)/build-on/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/build-on/page.tsx",
                                lineNumber: 244,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/build-on/page.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/build-on/page.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/build-on/page.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '48px 48px 80px',
            width: '100%'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 900,
                margin: '0 auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up",
                    style: {
                        marginBottom: 48
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 11,
                                letterSpacing: '0.15em',
                                color: 'var(--accent)',
                                textTransform: 'uppercase',
                                marginBottom: 12
                            },
                            children: "Knowledge Lineage"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 262,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontFamily: 'var(--font-cormorant), Georgia, serif',
                                fontSize: 'clamp(48px, 6vw, 72px)',
                                fontWeight: 400,
                                lineHeight: 1,
                                marginBottom: 12
                            },
                            children: "Build-on Tree"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 15,
                                color: 'var(--text-secondary)',
                                maxWidth: 520,
                                lineHeight: 1.7
                            },
                            children: "See how knowledge compounds at ITM University. Every project that built on top of another, chained together into a living lineage tree."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/build-on/page.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up delay-1",
                    style: {
                        display: 'flex',
                        gap: 1,
                        background: 'var(--border)',
                        borderRadius: 12,
                        overflow: 'hidden',
                        marginBottom: 36
                    },
                    children: [
                        {
                            label: 'Chains',
                            value: totalChains
                        },
                        {
                            label: 'Origin Projects',
                            value: roots.length
                        },
                        {
                            label: 'Depth Levels',
                            value: roots.length > 0 ? Math.max(...roots.map((r)=>{
                                function maxDepth(n) {
                                    if (n.children.length === 0) return n.depth;
                                    return Math.max(...n.children.map(maxDepth));
                                }
                                return maxDepth(r);
                            })) + 1 : 0
                        }
                    ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                background: 'var(--bg-surface)',
                                padding: '20px',
                                textAlign: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                                        fontSize: 36,
                                        fontWeight: 300
                                    },
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 11,
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase'
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(main)/build-on/page.tsx",
                    lineNumber: 279,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up delay-1",
                    style: {
                        marginBottom: 32
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        placeholder: "Search projects in the tree…",
                        style: {
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/build-on/page.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/build-on/page.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        padding: '60px',
                        color: 'var(--text-muted)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 32,
                                opacity: 0.3,
                                marginBottom: 12
                            },
                            children: "◫"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 319,
                            columnNumber: 13
                        }, this),
                        "Building the tree…"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/build-on/page.tsx",
                    lineNumber: 318,
                    columnNumber: 11
                }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        padding: '60px',
                        background: 'var(--bg-surface)',
                        border: '2px dashed var(--border)',
                        borderRadius: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 40,
                                opacity: 0.3,
                                marginBottom: 16
                            },
                            children: "◫"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--font-cormorant), Georgia, serif',
                                fontSize: 24,
                                marginBottom: 8
                            },
                            children: search ? 'No matches found' : 'No build-on chains yet'
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 14,
                                color: 'var(--text-muted)',
                                marginBottom: 24,
                                maxWidth: 380,
                                margin: '0 auto 24px'
                            },
                            children: search ? 'Try a different search term.' : 'When students submit projects that build on previous work, the lineage tree appears here.'
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this),
                        !search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/projects/submit",
                            style: {
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '11px 24px',
                                borderRadius: 10,
                                background: 'var(--accent)',
                                color: '#1c1917',
                                fontSize: 13,
                                fontWeight: 600
                            },
                            children: "Submit a Project →"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 339,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/build-on/page.tsx",
                    lineNumber: 323,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up delay-2",
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24
                    },
                    children: filtered.map((root)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 16,
                                padding: '20px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 10,
                                        letterSpacing: '0.15em',
                                        color: 'var(--text-muted)',
                                        textTransform: 'uppercase',
                                        marginBottom: 14,
                                        paddingBottom: 12,
                                        borderBottom: '1px solid var(--border-subtle)'
                                    },
                                    children: [
                                        "Knowledge chain · ",
                                        countChain(root),
                                        " project",
                                        countChain(root) !== 1 ? 's' : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TreeNode, {
                                    node: root,
                                    isLast: true
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/build-on/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, root.id, true, {
                            fileName: "[project]/app/(main)/build-on/page.tsx",
                            lineNumber: 352,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(main)/build-on/page.tsx",
                    lineNumber: 350,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/build-on/page.tsx",
            lineNumber: 258,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/build-on/page.tsx",
        lineNumber: 257,
        columnNumber: 5
    }, this);
}
_s(BuildOnPage, "9g7/R48R+oZPhEwhumMv7APJgGk=");
_c = BuildOnPage;
// Count total nodes in a chain
function countChain(node) {
    return 1 + node.children.reduce((acc, c)=>acc + countChain(c), 0);
}
var _c;
__turbopack_context__.k.register(_c, "BuildOnPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_%28main%29_build-on_page_tsx_1b267cd9._.js.map