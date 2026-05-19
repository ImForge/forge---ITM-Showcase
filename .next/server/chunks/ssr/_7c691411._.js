module.exports = {

"[project]/.next-internal/server/app/(main)/profile/[username]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/app/(main)/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/app/(main)/profile/[username]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Profile page — Server Component
__turbopack_context__.s({
    "default": (()=>ProfilePage),
    "generateMetadata": (()=>generateMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
;
;
;
;
async function generateMetadata({ params }) {
    const { username } = await params;
    return {
        title: `@${username} · Forge`
    };
}
// ─── ACHIEVEMENT SYSTEM ───────────────────────────────────────────────────
// Earned from real stats — no fake badges
function getAchievements(projects, totalStars, totalViews) {
    const list = [];
    if (projects.length >= 1) list.push({
        icon: '◫',
        label: 'Builder',
        desc: 'First project published'
    });
    if (projects.length >= 5) list.push({
        icon: '◈',
        label: 'Prolific',
        desc: '5+ projects archived'
    });
    if (projects.length >= 10) list.push({
        icon: '◎',
        label: 'Top Contributor',
        desc: '10+ projects published'
    });
    if (totalStars >= 10) list.push({
        icon: '★',
        label: 'Acclaimed',
        desc: '10+ stars earned'
    });
    if (totalStars >= 50) list.push({
        icon: '✦',
        label: 'Renowned',
        desc: '50+ stars earned'
    });
    if (totalViews >= 100) list.push({
        icon: '◉',
        label: 'Discovered',
        desc: '100+ profile views'
    });
    if (totalViews >= 1000) list.push({
        icon: '⌕',
        label: 'Influential',
        desc: '1000+ project views'
    });
    const hasBuildOn = projects.some((p)=>p.build_ons_child?.length > 0 || p.build_ons_parent?.length > 0);
    if (hasBuildOn) list.push({
        icon: '⊕',
        label: 'Chain Maker',
        desc: 'Contributed to build-on lineage'
    });
    return list;
}
// ─── CONTRIBUTION HEATMAP ─────────────────────────────────────────────────
// Built from real project/assignment submission dates
function buildHeatmap(projects, assignments) {
    const counts = {};
    const now = new Date();
    // Last 52 weeks
    for(let w = 51; w >= 0; w--){
        for(let d = 0; d < 7; d++){
            const date = new Date(now);
            date.setDate(date.getDate() - (w * 7 + d));
            const key = date.toISOString().slice(0, 10);
            counts[key] = 0;
        }
    }
    projects.forEach((p)=>{
        const key = p.created_at?.slice(0, 10);
        if (key && key in counts) counts[key] = (counts[key] ?? 0) + 2;
    });
    assignments.forEach((a)=>{
        const key = a.created_at?.slice(0, 10);
        if (key && key in counts) counts[key] = (counts[key] ?? 0) + 1;
    });
    return counts;
}
// ─── ACTIVITY TIMELINE ────────────────────────────────────────────────────
function buildTimeline(projects, assignments) {
    const events = [];
    projects.forEach((p)=>events.push({
            date: p.created_at,
            icon: '◫',
            text: `Published ${p.title}`,
            sub: `${p.star_count} stars · ${p.views ?? 0} views`
        }));
    assignments.forEach((a)=>events.push({
            date: a.created_at,
            icon: '☰',
            text: `Uploaded ${a.title}`,
            sub: `${a.subject} · ${a.semester}`
        }));
    return events.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
}
// ─── RELATIVE TIME ────────────────────────────────────────────────────────
function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
}
async function ProfilePage({ params }) {
    const { username } = await params;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profileRaw } = await supabase.from('profiles').select('*').eq('username', username.toLowerCase()).single();
    if (!profileRaw) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const profile = profileRaw;
    const isOwnProfile = user?.id === profile.id;
    // All data in parallel
    const [{ data: projectsRaw }, { data: assignmentsRaw }, { data: savesRaw }, { data: teamsRaw }] = await Promise.all([
        supabase.from('projects').select(`
      *, views,
      profiles!projects_submitted_by_fkey(id,username,avatar_url,full_name),
      project_tags(tag_id,tags(id,name,color)),
      project_members(profile_id,role,profiles!project_members_profile_id_fkey(id,username,avatar_url,full_name))
    `).eq('submitted_by', profile.id).eq('status', 'approved').order('star_count', {
            ascending: false
        }),
        supabase.from('assignments').select('*,profiles(id,username,avatar_url,full_name)').eq('submitted_by', profile.id).order('created_at', {
            ascending: false
        }).limit(12),
        isOwnProfile ? supabase.from('saves').select(`project_id, projects(
          *,profiles!projects_submitted_by_fkey(id,username,avatar_url,full_name),
          project_tags(tag_id,tags(id,name,color)),
          project_members(profile_id,role,profiles!project_members_profile_id_fkey(id,username,avatar_url,full_name))
        )`).eq('user_id', profile.id).not('project_id', 'is', null) : Promise.resolve({
            data: []
        }),
        supabase.from('team_members').select('role,teams(id,name,logo_url)').eq('profile_id', profile.id)
    ]);
    const projects = projectsRaw ?? [];
    const assignments = assignmentsRaw ?? [];
    const savedProjects = savesRaw?.map((s)=>s.projects).filter(Boolean) ?? [];
    const teams = teamsRaw ?? [];
    // Computed stats
    const totalStars = projects.reduce((a, p)=>a + (p.star_count ?? 0), 0);
    const totalViews = projects.reduce((a, p)=>a + (p.views ?? 0), 0);
    const collabScore = projects.reduce((a, p)=>a + (p.project_members?.length ?? 1), 0);
    // Pinned = top 3 by stars (later can be user-selected)
    const pinned = projects.slice(0, 3);
    const rest = projects.slice(3);
    const achievements = getAchievements(projects, totalStars, totalViews);
    const heatmap = buildHeatmap(projects, assignments);
    const timeline = buildTimeline(projects, assignments);
    const socialLinks = [
        profile.github_url && {
            href: profile.github_url,
            label: 'GitHub',
            icon: '⌥',
            color: '#333'
        },
        profile.twitter_url && {
            href: profile.twitter_url,
            label: 'Twitter',
            icon: '✦',
            color: '#1da1f2'
        },
        profile.instagram_url && {
            href: profile.instagram_url,
            label: 'Instagram',
            icon: '◎',
            color: '#e1306c'
        },
        profile.discord_username && {
            href: `https://discord.com/users/${profile.discord_username}`,
            label: 'Discord',
            icon: '◈',
            color: '#5865f2'
        },
        profile.spotify_url && {
            href: profile.spotify_url,
            label: 'Spotify',
            icon: '♪',
            color: '#1db954'
        }
    ].filter(Boolean);
    // Heatmap weeks array
    const heatmapWeeks = [];
    const heatDates = Object.entries(heatmap).sort(([a], [b])=>a.localeCompare(b));
    for(let i = 0; i < heatDates.length; i += 7){
        heatmapWeeks.push(heatDates.slice(i, i + 7).map(([date, count])=>({
                date,
                count
            })));
    }
    const maxCount = Math.max(...Object.values(heatmap), 1);
    function heatColor(count) {
        if (count === 0) return 'var(--bg-overlay)';
        const intensity = Math.min(count / maxCount, 1);
        if (intensity < 0.25) return 'rgba(201,151,58,0.2)';
        if (intensity < 0.5) return 'rgba(201,151,58,0.45)';
        if (intensity < 0.75) return 'rgba(201,151,58,0.7)';
        return 'var(--accent)';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            paddingBottom: 80
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    height: 220,
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #1a1612 0%, #2a2218 40%, #1c1510 70%, #0f0e0c 100%)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
                            backgroundSize: '200px 200px',
                            opacity: 0.6
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: -80,
                            left: '30%',
                            width: 400,
                            height: 300,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(201,151,58,0.15) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: -60,
                            right: '20%',
                            width: 300,
                            height: 240,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 24,
                            right: 32,
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: 80,
                            fontWeight: 300,
                            color: 'rgba(255,255,255,0.04)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                            userSelect: 'none',
                            pointerEvents: 'none'
                        },
                        children: [
                            "@",
                            profile.username
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1080,
                    margin: '0 auto',
                    padding: '0 40px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 40
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between',
                                    marginTop: -52
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 104,
                                            height: 104,
                                            borderRadius: '50%',
                                            background: 'var(--bg-overlay)',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 42,
                                            color: 'var(--accent)',
                                            border: '4px solid var(--bg-base)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                                        },
                                        children: profile.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: profile.avatar_url,
                                            alt: profile.username,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 19
                                        }, this) : profile.username[0]?.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/profile/settings",
                                        style: {
                                            padding: '9px 18px',
                                            borderRadius: 10,
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-surface)',
                                            fontSize: 12,
                                            color: 'var(--text-secondary)',
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6
                                        },
                                        children: "✎ Edit Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            flexWrap: 'wrap',
                                            marginBottom: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 'clamp(32px, 4vw, 48px)',
                                                    fontWeight: 400,
                                                    lineHeight: 1,
                                                    color: 'var(--text-primary)'
                                                },
                                                children: profile.full_name || profile.username
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 15
                                            }, this),
                                            profile.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 10,
                                                    padding: '3px 10px',
                                                    borderRadius: 99,
                                                    background: 'rgba(185,64,64,0.12)',
                                                    color: 'var(--danger)',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.08em',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 14,
                                            color: 'var(--accent)',
                                            marginBottom: 12
                                        },
                                        children: [
                                            "@",
                                            profile.username,
                                            profile.graduation_year && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--text-muted)',
                                                    marginLeft: 12,
                                                    fontSize: 13
                                                },
                                                children: [
                                                    "· Batch of ",
                                                    profile.graduation_year
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    profile.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 15,
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.7,
                                            maxWidth: 540,
                                            marginBottom: 16
                                        },
                                        children: profile.bio
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this),
                                    socialLinks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            flexWrap: 'wrap'
                                        },
                                        children: socialLinks.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: s.href,
                                                target: "_blank",
                                                rel: "noopener",
                                                style: {
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    padding: '6px 14px',
                                                    borderRadius: 99,
                                                    background: 'var(--bg-surface)',
                                                    border: '1px solid var(--border-subtle)',
                                                    fontSize: 12,
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: 500,
                                                    transition: 'all 0.15s',
                                                    textDecoration: 'none'
                                                },
                                                onMouseEnter: (e)=>{
                                                    const el = e.currentTarget;
                                                    el.style.borderColor = s.color;
                                                    el.style.color = s.color;
                                                },
                                                onMouseLeave: (e)=>{
                                                    const el = e.currentTarget;
                                                    el.style.borderColor = 'var(--border-subtle)';
                                                    el.style.color = 'var(--text-secondary)';
                                                },
                                                children: [
                                                    s.icon,
                                                    " ",
                                                    s.label
                                                ]
                                            }, s.href, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-up delay-1",
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: 1,
                            background: 'var(--border)',
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: '1px solid var(--border)',
                            marginBottom: 48
                        },
                        children: [
                            {
                                label: 'Projects',
                                value: projects.length
                            },
                            {
                                label: 'Stars',
                                value: totalStars
                            },
                            {
                                label: 'Views',
                                value: totalViews
                            },
                            {
                                label: 'Collab',
                                value: collabScore
                            },
                            {
                                label: 'Assignments',
                                value: assignments.length
                            },
                            {
                                label: 'Teams',
                                value: teams.length
                            }
                        ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'var(--bg-surface)',
                                    padding: '18px 12px',
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                                            fontSize: 32,
                                            fontWeight: 300,
                                            lineHeight: 1,
                                            marginBottom: 4,
                                            color: 'var(--text-primary)'
                                        },
                                        children: value
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 10,
                                            color: 'var(--text-muted)',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase'
                                        },
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, label, true, {
                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 300px',
                            gap: 40,
                            alignItems: 'start'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    achievements.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "animate-fade-up delay-1",
                                        style: {
                                            marginBottom: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 28,
                                                    fontWeight: 400,
                                                    marginBottom: 16
                                                },
                                                children: "Milestones"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 10,
                                                    flexWrap: 'wrap'
                                                },
                                                children: achievements.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 10,
                                                            padding: '10px 16px',
                                                            borderRadius: 12,
                                                            background: 'var(--bg-surface)',
                                                            border: '1px solid var(--border-subtle)',
                                                            transition: 'all 0.2s'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            const el = e.currentTarget;
                                                            el.style.borderColor = 'var(--accent)';
                                                            el.style.background = 'var(--accent-light)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            const el = e.currentTarget;
                                                            el.style.borderColor = 'var(--border-subtle)';
                                                            el.style.background = 'var(--bg-surface)';
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 18
                                                                },
                                                                children: a.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 600,
                                                                            color: 'var(--text-primary)'
                                                                        },
                                                                        children: a.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 390,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: 'var(--text-muted)'
                                                                        },
                                                                        children: a.desc
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, a.label, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this),
                                    pinned.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "animate-fade-up delay-2",
                                        style: {
                                            marginBottom: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                    justifyContent: 'space-between',
                                                    marginBottom: 20
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: {
                                                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                            fontSize: 28,
                                                            fontWeight: 400
                                                        },
                                                        children: "Featured Work"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 403,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: "Top by stars"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this),
                                            pinned[0] && (()=>{
                                                const p = pinned[0];
                                                const tags = p.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
                                                const members = p.project_members ?? [];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/projects/${p.id}`,
                                                    style: {
                                                        display: 'block',
                                                        borderRadius: 20,
                                                        overflow: 'hidden',
                                                        border: '1px solid var(--border-subtle)',
                                                        marginBottom: 16,
                                                        textDecoration: 'none',
                                                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                                                        background: 'var(--bg-surface)'
                                                    },
                                                    onMouseEnter: (e)=>{
                                                        const el = e.currentTarget;
                                                        el.style.borderColor = 'var(--accent)';
                                                        el.style.boxShadow = '0 16px 48px rgba(201,151,58,0.15)';
                                                        el.style.transform = 'translateY(-4px)';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        const el = e.currentTarget;
                                                        el.style.borderColor = 'var(--border-subtle)';
                                                        el.style.boxShadow = 'none';
                                                        el.style.transform = 'translateY(0)';
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: '100%',
                                                                height: 240,
                                                                background: 'linear-gradient(135deg, var(--bg-overlay), var(--bg-base))',
                                                                overflow: 'hidden',
                                                                position: 'relative',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: 64,
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: [
                                                                p.thumbnail_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: p.thumbnail_url,
                                                                    alt: p.title,
                                                                    style: {
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 443,
                                                                    columnNumber: 29
                                                                }, this) : '◫',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: 'absolute',
                                                                        bottom: 0,
                                                                        left: 0,
                                                                        right: 0,
                                                                        height: '50%',
                                                                        background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                                                                        pointerEvents: 'none'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 447,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: 'absolute',
                                                                        top: 14,
                                                                        left: 14,
                                                                        fontSize: 9,
                                                                        padding: '4px 12px',
                                                                        borderRadius: 99,
                                                                        background: 'rgba(201,151,58,0.9)',
                                                                        color: '#1c1917',
                                                                        fontWeight: 700,
                                                                        letterSpacing: '0.1em',
                                                                        textTransform: 'uppercase',
                                                                        backdropFilter: 'blur(8px)'
                                                                    },
                                                                    children: "★ Featured"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: 'absolute',
                                                                        top: 14,
                                                                        right: 14,
                                                                        fontSize: 12,
                                                                        padding: '4px 12px',
                                                                        borderRadius: 99,
                                                                        background: 'rgba(0,0,0,0.5)',
                                                                        color: 'white',
                                                                        backdropFilter: 'blur(8px)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 5
                                                                    },
                                                                    children: [
                                                                        "★ ",
                                                                        p.star_count
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 463,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                padding: '24px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        gap: 6,
                                                                        flexWrap: 'wrap',
                                                                        marginBottom: 10
                                                                    },
                                                                    children: tags.slice(0, 4).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "tag-pill",
                                                                            children: t.name
                                                                        }, t.id, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 475,
                                                                            columnNumber: 54
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 474,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    style: {
                                                                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                                        fontSize: 28,
                                                                        fontWeight: 400,
                                                                        lineHeight: 1.1,
                                                                        marginBottom: 8,
                                                                        color: 'var(--text-primary)'
                                                                    },
                                                                    children: p.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 25
                                                                }, this),
                                                                p.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 14,
                                                                        color: 'var(--text-secondary)',
                                                                        lineHeight: 1.6,
                                                                        marginBottom: 16
                                                                    },
                                                                    children: p.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 485,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 16,
                                                                        fontSize: 12,
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex'
                                                                            },
                                                                            children: members.slice(0, 4).map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        width: 24,
                                                                                        height: 24,
                                                                                        borderRadius: '50%',
                                                                                        background: 'var(--bg-overlay)',
                                                                                        overflow: 'hidden',
                                                                                        border: '2px solid var(--bg-surface)',
                                                                                        marginLeft: i > 0 ? -8 : 0,
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        fontSize: 9,
                                                                                        color: 'var(--accent)'
                                                                                    },
                                                                                    children: m.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: m.profiles.avatar_url,
                                                                                        style: {
                                                                                            width: '100%',
                                                                                            height: '100%',
                                                                                            objectFit: 'cover'
                                                                                        },
                                                                                        alt: ""
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                        lineNumber: 501,
                                                                                        columnNumber: 37
                                                                                    }, this) : m.profiles?.username?.[0]?.toUpperCase()
                                                                                }, m.profile_id, false, {
                                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                    lineNumber: 492,
                                                                                    columnNumber: 31
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 490,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                members.length,
                                                                                " contributor",
                                                                                members.length !== 1 ? 's' : ''
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 506,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        p.semester && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                "· ",
                                                                                p.semester
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 507,
                                                                            columnNumber: 42
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                marginLeft: 'auto'
                                                                            },
                                                                            children: [
                                                                                p.views ?? 0,
                                                                                " views"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 508,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        p.repo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                color: 'var(--accent)'
                                                                            },
                                                                            children: "⌥ GitHub"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 512,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        p.live_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                color: 'var(--accent)'
                                                                            },
                                                                            children: "◎ Live"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 515,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                            lineNumber: 473,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 21
                                                }, this);
                                            })(),
                                            pinned.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                                                    gap: 14
                                                },
                                                children: pinned.slice(1).map((p)=>{
                                                    const tags = p.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/projects/${p.id}`,
                                                        style: {
                                                            borderRadius: 16,
                                                            overflow: 'hidden',
                                                            border: '1px solid var(--border-subtle)',
                                                            display: 'block',
                                                            textDecoration: 'none',
                                                            background: 'var(--bg-surface)',
                                                            transition: 'all 0.25s'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            const el = e.currentTarget;
                                                            el.style.borderColor = 'var(--accent)';
                                                            el.style.transform = 'translateY(-2px)';
                                                            el.style.boxShadow = '0 8px 24px rgba(201,151,58,0.1)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            const el = e.currentTarget;
                                                            el.style.borderColor = 'var(--border-subtle)';
                                                            el.style.transform = 'translateY(0)';
                                                            el.style.boxShadow = 'none';
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    height: 110,
                                                                    background: 'var(--bg-overlay)',
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 28,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: [
                                                                    p.thumbnail_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: p.thumbnail_url,
                                                                        style: {
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover'
                                                                        },
                                                                        alt: ""
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 555,
                                                                        columnNumber: 33
                                                                    }, this) : '◫',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            position: 'absolute',
                                                                            top: 8,
                                                                            right: 8,
                                                                            fontSize: 11,
                                                                            padding: '2px 8px',
                                                                            borderRadius: 99,
                                                                            background: 'rgba(0,0,0,0.5)',
                                                                            color: 'white',
                                                                            backdropFilter: 'blur(6px)'
                                                                        },
                                                                        children: [
                                                                            "★ ",
                                                                            p.star_count
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 548,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    padding: '14px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            gap: 4,
                                                                            flexWrap: 'wrap',
                                                                            marginBottom: 6
                                                                        },
                                                                        children: tags.slice(0, 2).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "tag-pill",
                                                                                children: t.name
                                                                            }, t.id, false, {
                                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                lineNumber: 568,
                                                                                columnNumber: 58
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 567,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                                            fontSize: 18,
                                                                            fontWeight: 400,
                                                                            lineHeight: 1.2,
                                                                            color: 'var(--text-primary)'
                                                                        },
                                                                        children: p.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 566,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 525,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    rest.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "animate-fade-up delay-3",
                                        style: {
                                            marginBottom: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 28,
                                                    fontWeight: 400,
                                                    marginBottom: 16
                                                },
                                                children: "All Projects"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 589,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                                                    gap: 14
                                                },
                                                children: rest.map((p)=>{
                                                    const tags = p.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/projects/${p.id}`,
                                                        style: {
                                                            borderRadius: 14,
                                                            overflow: 'hidden',
                                                            border: '1px solid var(--border-subtle)',
                                                            display: 'block',
                                                            textDecoration: 'none',
                                                            background: 'var(--bg-surface)',
                                                            transition: 'all 0.2s'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            const el = e.currentTarget;
                                                            el.style.borderColor = 'var(--accent)';
                                                            el.style.transform = 'translateY(-2px)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            const el = e.currentTarget;
                                                            el.style.borderColor = 'var(--border-subtle)';
                                                            el.style.transform = 'translateY(0)';
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    height: 100,
                                                                    background: 'var(--bg-overlay)',
                                                                    overflow: 'hidden',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 24,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: p.thumbnail_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: p.thumbnail_url,
                                                                    style: {
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover'
                                                                    },
                                                                    alt: ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 618,
                                                                    columnNumber: 31
                                                                }, this) : '◫'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 612,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    padding: '12px 14px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            gap: 4,
                                                                            flexWrap: 'wrap',
                                                                            marginBottom: 5
                                                                        },
                                                                        children: tags.slice(0, 2).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "tag-pill",
                                                                                children: t.name
                                                                            }, t.id, false, {
                                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                lineNumber: 623,
                                                                                columnNumber: 56
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 622,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                                            fontSize: 17,
                                                                            fontWeight: 400,
                                                                            lineHeight: 1.2,
                                                                            marginBottom: 6
                                                                        },
                                                                        children: p.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 625,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            fontSize: 11,
                                                                            color: 'var(--text-muted)'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: p.semester
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                lineNumber: 629,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    color: 'var(--accent)'
                                                                                },
                                                                                children: [
                                                                                    "★ ",
                                                                                    p.star_count
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                lineNumber: 630,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 592,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 588,
                                        columnNumber: 15
                                    }, this),
                                    projects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "animate-fade-up delay-3",
                                        style: {
                                            marginBottom: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 28,
                                                    fontWeight: 400,
                                                    marginBottom: 6
                                                },
                                                children: "Contribution Activity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 643,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: 'var(--text-muted)',
                                                    marginBottom: 16
                                                },
                                                children: [
                                                    projects.length + assignments.length,
                                                    " contributions in the last year"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 646,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: 'var(--bg-surface)',
                                                    border: '1px solid var(--border-subtle)',
                                                    borderRadius: 16,
                                                    padding: '20px',
                                                    overflowX: 'auto'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 3,
                                                            minWidth: 'fit-content'
                                                        },
                                                        children: heatmapWeeks.map((week, wi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: 3
                                                                },
                                                                children: week.map(({ date, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        title: `${date}: ${count} contribution${count !== 1 ? 's' : ''}`,
                                                                        style: {
                                                                            width: 12,
                                                                            height: 12,
                                                                            borderRadius: 3,
                                                                            background: heatColor(count),
                                                                            transition: 'transform 0.1s',
                                                                            cursor: count > 0 ? 'pointer' : 'default'
                                                                        },
                                                                        onMouseEnter: (e)=>{
                                                                            e.currentTarget.style.transform = 'scale(1.4)';
                                                                        },
                                                                        onMouseLeave: (e)=>{
                                                                            e.currentTarget.style.transform = 'scale(1)';
                                                                        }
                                                                    }, date, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, wi, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 6,
                                                            marginTop: 10,
                                                            justifyContent: 'flex-end'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: "Less"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 672,
                                                                columnNumber: 21
                                                            }, this),
                                                            [
                                                                0,
                                                                0.25,
                                                                0.5,
                                                                0.75,
                                                                1
                                                            ].map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 10,
                                                                        height: 10,
                                                                        borderRadius: 2,
                                                                        background: heatColor(v * maxCount)
                                                                    }
                                                                }, i, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 674,
                                                                    columnNumber: 23
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: "More"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 649,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 642,
                                        columnNumber: 15
                                    }, this),
                                    isOwnProfile && savedProjects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "animate-fade-up delay-4",
                                        style: {
                                            marginBottom: 48
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 28,
                                                    fontWeight: 400,
                                                    marginBottom: 16
                                                },
                                                children: "Saved"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 685,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                                    gap: 12
                                                },
                                                children: savedProjects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/projects/${p.id}`,
                                                        style: {
                                                            padding: '14px 16px',
                                                            borderRadius: 12,
                                                            background: 'var(--bg-surface)',
                                                            border: '1px solid var(--border-subtle)',
                                                            display: 'block',
                                                            textDecoration: 'none',
                                                            transition: 'all 0.2s'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            e.currentTarget.style.borderColor = 'var(--accent)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                                    fontSize: 17,
                                                                    fontWeight: 400,
                                                                    marginBottom: 4
                                                                },
                                                                children: p.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: [
                                                                    "by @",
                                                                    p.profiles?.username
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 701,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 15
                                    }, this),
                                    projects.length === 0 && assignments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '60px',
                                            background: 'var(--bg-surface)',
                                            border: '2px dashed var(--border)',
                                            borderRadius: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 48,
                                                    opacity: 0.2,
                                                    marginBottom: 16
                                                },
                                                children: "◫"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 24,
                                                    marginBottom: 8
                                                },
                                                children: "Nothing here yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 717,
                                                columnNumber: 17
                                            }, this),
                                            isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/projects/submit",
                                                style: {
                                                    display: 'inline-block',
                                                    marginTop: 8,
                                                    fontSize: 13,
                                                    color: 'var(--accent)',
                                                    fontWeight: 600
                                                },
                                                children: "Submit your first project →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 721,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 710,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: [
                                    teams.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 16,
                                            padding: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    letterSpacing: '0.15em',
                                                    color: 'var(--text-muted)',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 14
                                                },
                                                children: "Teams"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 742,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 10
                                                },
                                                children: teams.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/teams/${t.teams?.id}`,
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 10,
                                                            textDecoration: 'none',
                                                            padding: '8px 10px',
                                                            borderRadius: 10,
                                                            transition: 'background 0.15s'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            e.currentTarget.style.background = 'var(--bg-overlay)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.background = 'transparent';
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: 8,
                                                                    flexShrink: 0,
                                                                    background: 'var(--bg-overlay)',
                                                                    overflow: 'hidden',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 13,
                                                                    color: 'var(--accent)',
                                                                    border: '1px solid var(--border-subtle)'
                                                                },
                                                                children: t.teams?.logo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: t.teams.logo_url,
                                                                    style: {
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover'
                                                                    },
                                                                    alt: ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 762,
                                                                    columnNumber: 29
                                                                }, this) : t.teams?.name?.[0]?.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 754,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    flex: 1,
                                                                    minWidth: 0
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 500,
                                                                            color: 'var(--text-primary)',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap'
                                                                        },
                                                                        children: t.teams?.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 766,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            color: 'var(--text-muted)',
                                                                            textTransform: 'capitalize'
                                                                        },
                                                                        children: t.role
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                        lineNumber: 769,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                lineNumber: 765,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 745,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 737,
                                        columnNumber: 15
                                    }, this),
                                    timeline.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 16,
                                            padding: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    letterSpacing: '0.15em',
                                                    color: 'var(--text-muted)',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 16
                                                },
                                                children: "Recent Activity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 784,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            left: 13,
                                                            top: 6,
                                                            bottom: 6,
                                                            width: 1,
                                                            background: 'var(--border-subtle)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 789,
                                                        columnNumber: 19
                                                    }, this),
                                                    timeline.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 12,
                                                                marginBottom: 16,
                                                                position: 'relative'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 26,
                                                                        height: 26,
                                                                        borderRadius: '50%',
                                                                        flexShrink: 0,
                                                                        background: 'var(--bg-elevated)',
                                                                        border: '1px solid var(--border-subtle)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: 11,
                                                                        zIndex: 1
                                                                    },
                                                                    children: e.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 798,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0,
                                                                        paddingTop: 3
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: 12,
                                                                                color: 'var(--text-secondary)',
                                                                                lineHeight: 1.4,
                                                                                marginBottom: 2
                                                                            },
                                                                            children: e.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 808,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between',
                                                                                gap: 8
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        fontSize: 10,
                                                                                        color: 'var(--text-muted)',
                                                                                        overflow: 'hidden',
                                                                                        textOverflow: 'ellipsis',
                                                                                        whiteSpace: 'nowrap'
                                                                                    },
                                                                                    children: e.sub
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                    lineNumber: 812,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        fontSize: 10,
                                                                                        color: 'var(--text-muted)',
                                                                                        flexShrink: 0
                                                                                    },
                                                                                    children: timeAgo(e.date)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                                    lineNumber: 815,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 811,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 807,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                            lineNumber: 794,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 787,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 779,
                                        columnNumber: 15
                                    }, this),
                                    assignments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 16,
                                            padding: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    letterSpacing: '0.15em',
                                                    color: 'var(--text-muted)',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 14
                                                },
                                                children: [
                                                    "Assignments (",
                                                    assignments.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 833,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 8
                                                },
                                                children: [
                                                    assignments.slice(0, 5).map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/assignments/${a.id}`,
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 10,
                                                                textDecoration: 'none',
                                                                padding: '8px 10px',
                                                                borderRadius: 10,
                                                                transition: 'background 0.15s'
                                                            },
                                                            onMouseEnter: (e)=>{
                                                                e.currentTarget.style.background = 'var(--bg-overlay)';
                                                            },
                                                            onMouseLeave: (e)=>{
                                                                e.currentTarget.style.background = 'transparent';
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: 8,
                                                                        flexShrink: 0,
                                                                        background: 'var(--bg-overlay)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: 14
                                                                    },
                                                                    children: a.file_url?.endsWith('.pdf') ? '📄' : a.file_url?.match(/\.(jpg|png)/i) ? '🖼' : '📎'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 845,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: 12,
                                                                                fontWeight: 500,
                                                                                color: 'var(--text-primary)',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                                whiteSpace: 'nowrap'
                                                                            },
                                                                            children: a.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 854,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: 'var(--text-muted)'
                                                                            },
                                                                            children: a.subject
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                            lineNumber: 857,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                                    lineNumber: 853,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, a.id, true, {
                                                            fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                            lineNumber: 838,
                                                            columnNumber: 21
                                                        }, this)),
                                                    assignments.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: 'var(--accent)',
                                                            paddingLeft: 10,
                                                            paddingTop: 4,
                                                            cursor: 'pointer'
                                                        },
                                                        children: [
                                                            "+",
                                                            assignments.length - 5,
                                                            " more"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                        lineNumber: 862,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                                lineNumber: 836,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                        lineNumber: 828,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                                lineNumber: 733,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/profile/[username]/page.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/profile/[username]/page.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/(main)/profile/[username]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/profile/[username]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_7c691411._.js.map