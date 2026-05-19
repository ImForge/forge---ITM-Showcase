(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/(main)/teams/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TeamPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// ─── ROLE BADGE ───────────────────────────────────────────────────────────
function RoleBadge({ role }) {
    const map = {
        leader: {
            bg: 'rgba(201,151,58,0.15)',
            color: 'var(--accent)'
        },
        admin: {
            bg: 'rgba(185,64,64,0.12)',
            color: 'var(--danger)'
        },
        contributor: {
            bg: 'rgba(74,124,89,0.12)',
            color: 'var(--success)'
        },
        member: {
            bg: 'var(--bg-overlay)',
            color: 'var(--text-muted)'
        }
    };
    const s = map[role] ?? map.member;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            fontSize: 9,
            padding: '2px 8px',
            borderRadius: 99,
            background: s.bg,
            color: s.color,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
        },
        children: role
    }, void 0, false, {
        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = RoleBadge;
// ─── RESOURCE LINK CARD ───────────────────────────────────────────────────
function ResourceCard({ href, label, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        target: "_blank",
        rel: "noopener",
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderRadius: 10,
            background: 'var(--bg-overlay)',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.15s',
            textDecoration: 'none'
        },
        onMouseEnter: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = 'var(--accent)';
            el.style.background = 'var(--accent-dim)';
        },
        onMouseLeave: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border-subtle)';
            el.style.background = 'var(--bg-overlay)';
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 16
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 11,
                    color: 'var(--text-muted)'
                },
                children: "↗"
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c1 = ResourceCard;
function TeamPage({ params }) {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const [team, setTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [members, setMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [myRole, setMyRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inviteUsername, setInviteU] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [inviting, setInviting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeSection, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('projects');
    // Edit form state
    const [editName, setEditName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editDesc, setEditDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [logoFile, setLogoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [logoPreview, setLogoPrev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Resources state (stored as JSON in team description hack-free — uses separate fields)
    const [githubUrl, setGithubUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [figmaUrl, setFigmaUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [driveUrl, setDriveUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [extraLinks, setExtraLinks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newLinkLabel, setNewLinkLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newLinkUrl, setNewLinkUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamPage.useEffect": ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            supabase.auth.getUser().then({
                "TeamPage.useEffect": async ({ data: { user } })=>{
                    if (!user) {
                        window.location.href = '/login';
                        return;
                    }
                    setUserId(user.id);
                    await loadTeam(user.id);
                }
            }["TeamPage.useEffect"]);
        }
    }["TeamPage.useEffect"], [
        id
    ]);
    async function loadTeam(uid) {
        setLoading(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: teamData } = await supabase.from('teams').select('*').eq('id', id).single();
        if (!teamData) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Team not found', 'error');
            setLoading(false);
            return;
        }
        setTeam(teamData);
        setEditName(teamData.name);
        setEditDesc(teamData.description ?? '');
        setLogoPrev(teamData.logo_url ?? null);
        // Parse stored resource links from team metadata field
        // We store them as JSON in a dedicated pattern in description
        // Format: actual description ||| {"github":"...","figma":"...","drive":"...","extra":[...]}
        const raw = teamData.description ?? '';
        const sep = raw.indexOf(' ||| ');
        if (sep !== -1) {
            try {
                const meta = JSON.parse(raw.slice(sep + 5));
                setGithubUrl(meta.github ?? '');
                setFigmaUrl(meta.figma ?? '');
                setDriveUrl(meta.drive ?? '');
                setExtraLinks(meta.extra ?? []);
                setEditDesc(raw.slice(0, sep));
            } catch  {}
        }
        const { data: membersData } = await supabase.from('team_members').select('*, profiles(id,username,avatar_url,full_name,github_url)').eq('team_id', id);
        setMembers(membersData ?? []);
        const me = (membersData ?? []).find((m)=>m.profile_id === uid);
        setMyRole(me?.role ?? null);
        const { data: projectsData } = await supabase.from('projects').select('*, profiles!projects_submitted_by_fkey(username,avatar_url,full_name), project_tags(tags(id,name)), project_members(profile_id,profiles(id,username,avatar_url))').eq('team_id', id).eq('status', 'approved').order('created_at', {
            ascending: false
        });
        setProjects(projectsData ?? []);
        setLoading(false);
    }
    async function saveEdit() {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        let logoUrl = team.logo_url;
        if (logoFile) {
            const ext = logoFile.name.split('.').pop();
            const path = `${id}-${Date.now()}.${ext}`;
            const { error } = await supabase.storage.from('team-logos').upload(path, logoFile, {
                upsert: true
            });
            if (!error) {
                const { data } = supabase.storage.from('team-logos').getPublicUrl(path);
                logoUrl = data.publicUrl;
            }
        }
        // Serialize resource links into description
        const meta = JSON.stringify({
            github: githubUrl.trim(),
            figma: figmaUrl.trim(),
            drive: driveUrl.trim(),
            extra: extraLinks
        });
        const fullDesc = editDesc.trim() ? `${editDesc.trim()} ||| ${meta}` : ` ||| ${meta}`;
        await supabase.from('teams').update({
            name: editName.trim(),
            description: fullDesc,
            logo_url: logoUrl
        }).eq('id', id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Team updated!', 'success');
        setEditing(false);
        await loadTeam(userId);
    }
    async function leaveTeam() {
        if (!confirm('Leave this team?')) return;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('team_members').delete().eq('team_id', id).eq('profile_id', userId);
        window.location.href = '/teams';
    }
    async function deleteTeam() {
        if (!confirm('Delete this team permanently?')) return;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('teams').delete().eq('id', id);
        window.location.href = '/teams';
    }
    async function inviteMember() {
        if (!inviteUsername.trim()) return;
        setInviting(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: profile } = await supabase.from('profiles').select('id').eq('username', inviteUsername.trim().toLowerCase()).maybeSingle();
        if (!profile) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('User not found', 'error');
            setInviting(false);
            return;
        }
        const already = members.some((m)=>m.profile_id === profile.id);
        if (already) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Already a member', 'error');
            setInviting(false);
            return;
        }
        await supabase.from('team_invitations').insert({
            team_id: id,
            invited_by: userId,
            invited_user: profile.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Invitation sent!', 'success');
        setInviteU('');
        setInviting(false);
    }
    function addExtraLink() {
        if (!newLinkLabel.trim() || !newLinkUrl.trim()) return;
        setExtraLinks((prev)=>[
                ...prev,
                {
                    label: newLinkLabel.trim(),
                    url: newLinkUrl.trim()
                }
            ]);
        setNewLinkLabel('');
        setNewLinkUrl('');
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            flexDirection: 'column',
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 32,
                    opacity: 0.2
                },
                children: "◎"
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: 'var(--text-muted)',
                    fontSize: 14
                },
                children: "Loading workspace…"
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
    const isLeader = myRole === 'leader';
    const isMember = !!myRole;
    // Parse description display (strip metadata)
    const displayDesc = team.description ? team.description.includes(' ||| ') ? team.description.slice(0, team.description.indexOf(' ||| ')) : team.description : '';
    // Collect all resource links
    const resources = [];
    if (githubUrl) resources.push({
        icon: '⌥',
        label: 'GitHub Repository',
        href: githubUrl
    });
    if (figmaUrl) resources.push({
        icon: '◈',
        label: 'Figma Design',
        href: figmaUrl
    });
    if (driveUrl) resources.push({
        icon: '◫',
        label: 'Google Drive',
        href: driveUrl
    });
    extraLinks.forEach((l)=>resources.push({
            icon: '◎',
            label: l.label,
            href: l.url
        }));
    // Build activity from real data
    const activity = [];
    projects.slice(0, 3).forEach((p)=>{
        activity.push({
            icon: '◫',
            text: `Submitted: ${p.title}`,
            time: new Date(p.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short'
            })
        });
    });
    members.slice(0, 2).forEach((m)=>{
        activity.push({
            icon: '⊕',
            text: `@${m.profiles?.username} joined as ${m.role}`,
            time: new Date(m.joined_at ?? team.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short'
            })
        });
    });
    activity.push({
        icon: '◎',
        text: `Team created`,
        time: new Date(team.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    });
    const sectionBtn = (s, label)=>({
            padding: '9px 18px',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            background: activeSection === s ? 'var(--accent-dim)' : 'transparent',
            color: activeSection === s ? 'var(--accent)' : 'var(--text-secondary)',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: activeSection === s ? 500 : 400,
            transition: 'all 0.15s'
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '0 0 80px',
            width: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-overlay) 100%)',
                    borderBottom: '1px solid var(--border-subtle)',
                    padding: '40px 48px 32px',
                    position: 'relative',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: -60,
                            right: -60,
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 1200,
                            margin: '0 auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/teams",
                                        style: {
                                            fontSize: 13,
                                            color: 'var(--text-muted)'
                                        },
                                        children: "Teams"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--border)',
                                            fontSize: 16
                                        },
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            color: 'var(--text-secondary)'
                                        },
                                        children: team.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 24,
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 80,
                                            height: 80,
                                            borderRadius: 20,
                                            flexShrink: 0,
                                            background: 'var(--bg-elevated)',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 32,
                                            color: 'var(--accent)',
                                            border: '2px solid var(--border-subtle)',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                                        },
                                        children: team.logo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: team.logo_url,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            },
                                            alt: ""
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 19
                                        }, this) : team.name[0]?.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            minWidth: 200
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 'clamp(36px, 5vw, 52px)',
                                                    fontWeight: 400,
                                                    lineHeight: 1,
                                                    marginBottom: 8
                                                },
                                                children: team.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 15
                                            }, this),
                                            displayDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 14,
                                                    color: 'var(--text-secondary)',
                                                    lineHeight: 1.6,
                                                    maxWidth: 560
                                                },
                                                children: displayDesc
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    marginTop: 14
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex'
                                                        },
                                                        children: [
                                                            members.slice(0, 6).map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: '50%',
                                                                        background: 'var(--bg-overlay)',
                                                                        overflow: 'hidden',
                                                                        border: '2px solid var(--bg-surface)',
                                                                        marginLeft: i > 0 ? -10 : 0,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: 12,
                                                                        color: 'var(--accent)',
                                                                        zIndex: members.length - i,
                                                                        position: 'relative',
                                                                        flexShrink: 0
                                                                    },
                                                                    children: m.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: m.profiles.avatar_url,
                                                                        style: {
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover'
                                                                        },
                                                                        alt: ""
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 335,
                                                                        columnNumber: 27
                                                                    }, this) : m.profiles?.username?.[0]?.toUpperCase()
                                                                }, m.profile_id, false, {
                                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 21
                                                                }, this)),
                                                            members.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: '50%',
                                                                    background: 'var(--accent-dim)',
                                                                    border: '2px solid var(--bg-surface)',
                                                                    marginLeft: -10,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 10,
                                                                    color: 'var(--accent)',
                                                                    fontWeight: 700,
                                                                    position: 'relative'
                                                                },
                                                                children: [
                                                                    "+",
                                                                    members.length - 6
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: [
                                                            members.length,
                                                            " member",
                                                            members.length !== 1 ? 's' : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, this),
                                                    isMember && myRole && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleBadge, {
                                                        role: myRole
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-start'
                                        },
                                        children: [
                                            isLeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditing((o)=>!o),
                                                style: {
                                                    padding: '10px 18px',
                                                    borderRadius: 10,
                                                    fontSize: 13,
                                                    background: editing ? 'var(--bg-overlay)' : 'var(--accent-dim)',
                                                    border: `1px solid ${editing ? 'var(--border)' : 'var(--accent)'}`,
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                    color: editing ? 'var(--text-secondary)' : 'var(--accent)',
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s'
                                                },
                                                children: editing ? '✕ Cancel' : '✎ Edit'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this),
                                            !isLeader && isMember && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: leaveTeam,
                                                style: {
                                                    padding: '10px 18px',
                                                    borderRadius: 10,
                                                    fontSize: 13,
                                                    background: 'none',
                                                    border: '1px solid var(--danger)',
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                    color: 'var(--danger)'
                                                },
                                                children: "Leave Team"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this),
                                            isLeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: deleteTeam,
                                                style: {
                                                    padding: '10px 18px',
                                                    borderRadius: 10,
                                                    fontSize: 13,
                                                    background: 'none',
                                                    border: '1px solid var(--border)',
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                    color: 'var(--text-muted)'
                                                },
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 361,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 1,
                    background: 'var(--border)',
                    borderBottom: '1px solid var(--border)'
                },
                children: [
                    {
                        label: 'Projects',
                        value: projects.length
                    },
                    {
                        label: 'Members',
                        value: members.length
                    },
                    {
                        label: 'Resources',
                        value: resources.length
                    },
                    {
                        label: 'Since',
                        value: new Date(team.created_at).toLocaleDateString('en-IN', {
                            month: 'short',
                            year: 'numeric'
                        })
                    }
                ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            background: 'var(--bg-surface)',
                            padding: '14px 20px',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                    fontSize: 28,
                                    fontWeight: 300,
                                    color: 'var(--text-primary)',
                                    lineHeight: 1
                                },
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10,
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginTop: 4
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 419,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                        lineNumber: 409,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '32px 48px',
                    maxWidth: 1200,
                    margin: '0 auto'
                },
                children: [
                    editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-up",
                        style: {
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 20,
                            padding: '32px',
                            marginBottom: 32
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                    fontSize: 26,
                                    marginBottom: 24
                                },
                                children: "Edit Team"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gap: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            display: 'block',
                                                            fontSize: 11,
                                                            color: 'var(--text-muted)',
                                                            letterSpacing: '0.1em',
                                                            textTransform: 'uppercase',
                                                            marginBottom: 6
                                                        },
                                                        children: "Team Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: editName,
                                                        onChange: (e)=>setEditName(e.target.value),
                                                        style: {
                                                            width: '100%',
                                                            padding: '11px 14px',
                                                            borderRadius: 10
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 442,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            display: 'block',
                                                            fontSize: 11,
                                                            color: 'var(--text-muted)',
                                                            letterSpacing: '0.1em',
                                                            textTransform: 'uppercase',
                                                            marginBottom: 6
                                                        },
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: editDesc,
                                                        onChange: (e)=>setEditDesc(e.target.value),
                                                        rows: 3,
                                                        style: {
                                                            width: '100%',
                                                            padding: '11px 14px',
                                                            borderRadius: 10,
                                                            resize: 'vertical'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            display: 'block',
                                                            fontSize: 11,
                                                            color: 'var(--text-muted)',
                                                            letterSpacing: '0.1em',
                                                            textTransform: 'uppercase',
                                                            marginBottom: 6
                                                        },
                                                        children: "Team Logo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 12
                                                        },
                                                        children: [
                                                            logoPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: 48,
                                                                    height: 48,
                                                                    borderRadius: 12,
                                                                    overflow: 'hidden'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: logoPreview,
                                                                    style: {
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover'
                                                                    },
                                                                    alt: ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                    lineNumber: 463,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    padding: '9px 18px',
                                                                    border: '1px solid var(--border)',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                    fontSize: 12,
                                                                    color: 'var(--text-secondary)',
                                                                    display: 'inline-block'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        accept: "image/*",
                                                                        style: {
                                                                            display: 'none'
                                                                        },
                                                                        onChange: (e)=>{
                                                                            const f = e.target.files?.[0];
                                                                            if (f) {
                                                                                setLogoFile(f);
                                                                                setLogoPrev(URL.createObjectURL(f));
                                                                            }
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    logoPreview ? 'Replace logo' : 'Upload logo'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 441,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gap: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: 'var(--text-muted)',
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    marginBottom: -6
                                                },
                                                children: "Shared Resources"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, this),
                                            [
                                                {
                                                    label: '⌥ GitHub URL',
                                                    val: githubUrl,
                                                    set: setGithubUrl,
                                                    ph: 'https://github.com/org/repo'
                                                },
                                                {
                                                    label: '◈ Figma URL',
                                                    val: figmaUrl,
                                                    set: setFigmaUrl,
                                                    ph: 'https://figma.com/file/...'
                                                },
                                                {
                                                    label: '◫ Drive URL',
                                                    val: driveUrl,
                                                    set: setDriveUrl,
                                                    ph: 'https://drive.google.com/...'
                                                }
                                            ].map(({ label, val, set, ph })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: {
                                                                display: 'block',
                                                                fontSize: 11,
                                                                color: 'var(--text-muted)',
                                                                marginBottom: 4
                                                            },
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                            lineNumber: 492,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: val,
                                                            onChange: (e)=>set(e.target.value),
                                                            placeholder: ph,
                                                            style: {
                                                                width: '100%',
                                                                padding: '9px 12px',
                                                                borderRadius: 8
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, label, true, {
                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 19
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 2fr auto',
                                                    gap: 6,
                                                    alignItems: 'end'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    display: 'block',
                                                                    fontSize: 11,
                                                                    color: 'var(--text-muted)',
                                                                    marginBottom: 4
                                                                },
                                                                children: "Label"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: newLinkLabel,
                                                                onChange: (e)=>setNewLinkLabel(e.target.value),
                                                                placeholder: "Notion, Slides…",
                                                                style: {
                                                                    width: '100%',
                                                                    padding: '9px 10px',
                                                                    borderRadius: 8
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: {
                                                                    display: 'block',
                                                                    fontSize: 11,
                                                                    color: 'var(--text-muted)',
                                                                    marginBottom: 4
                                                                },
                                                                children: "URL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: newLinkUrl,
                                                                onChange: (e)=>setNewLinkUrl(e.target.value),
                                                                placeholder: "https://…",
                                                                style: {
                                                                    width: '100%',
                                                                    padding: '9px 10px',
                                                                    borderRadius: 8
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: addExtraLink,
                                                        style: {
                                                            padding: '9px 12px',
                                                            background: 'var(--accent-dim)',
                                                            border: '1px solid var(--accent)',
                                                            borderRadius: 8,
                                                            cursor: 'pointer',
                                                            fontFamily: 'inherit',
                                                            color: 'var(--accent)',
                                                            fontSize: 13
                                                        },
                                                        children: "+ Add"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 509,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 482,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 439,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 12,
                                    marginTop: 24,
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    paddingTop: 20,
                                    borderTop: '1px solid var(--border-subtle)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            flex: 1,
                                            minWidth: 240
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: inviteUsername,
                                                onChange: (e)=>setInviteU(e.target.value),
                                                placeholder: "Invite by @username",
                                                style: {
                                                    flex: 1,
                                                    padding: '10px 14px',
                                                    borderRadius: 10
                                                },
                                                onKeyDown: (e)=>e.key === 'Enter' && inviteMember()
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: inviteMember,
                                                disabled: inviting,
                                                style: {
                                                    padding: '10px 18px',
                                                    background: 'var(--bg-overlay)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 10,
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                    fontSize: 13,
                                                    color: 'var(--text-secondary)'
                                                },
                                                children: inviting ? '…' : 'Invite'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 526,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: saveEdit,
                                        style: {
                                            padding: '11px 28px',
                                            background: 'var(--accent)',
                                            color: '#1c1917',
                                            border: 'none',
                                            borderRadius: 10,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            fontSize: 13,
                                            fontWeight: 600
                                        },
                                        children: "Save Changes →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 534,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 520,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 300px',
                            gap: 28,
                            alignItems: 'start'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 4,
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 12,
                                            padding: 4,
                                            marginBottom: 24,
                                            width: 'fit-content'
                                        },
                                        children: [
                                            'projects',
                                            'members',
                                            'resources'
                                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSection(s),
                                                style: sectionBtn(s, s),
                                                children: [
                                                    s === 'projects' ? `◫ Projects (${projects.length})` : '',
                                                    s === 'members' ? `⊕ Members (${members.length})` : '',
                                                    s === 'resources' ? `◎ Resources (${resources.length})` : ''
                                                ]
                                            }, s, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this),
                                    activeSection === 'projects' && (projects.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '64px 40px',
                                            background: 'var(--bg-surface)',
                                            border: '2px dashed var(--border)',
                                            borderRadius: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 48,
                                                    opacity: 0.2,
                                                    marginBottom: 16
                                                },
                                                children: "◫"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 574,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 26,
                                                    marginBottom: 8
                                                },
                                                children: "Start building together."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 575,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 14,
                                                    color: 'var(--text-muted)',
                                                    marginBottom: 24
                                                },
                                                children: "Create your first collaborative project and it appears here."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 578,
                                                columnNumber: 19
                                            }, this),
                                            isMember && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/projects/submit",
                                                style: {
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    padding: '12px 24px',
                                                    borderRadius: 10,
                                                    background: 'var(--accent)',
                                                    color: '#1c1917',
                                                    fontSize: 13,
                                                    fontWeight: 600
                                                },
                                                children: "Submit First Project →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 582,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 568,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gap: 14
                                        },
                                        children: [
                                            projects.map((p)=>{
                                                const tags = (p.project_tags ?? []).map((pt)=>pt.tags).filter(Boolean);
                                                const collabs = p.project_members ?? [];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/projects/${p.id}`,
                                                    style: {
                                                        background: 'var(--bg-surface)',
                                                        border: '1px solid var(--border-subtle)',
                                                        borderRadius: 16,
                                                        padding: '20px',
                                                        display: 'block',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.2s'
                                                    },
                                                    onMouseEnter: (e)=>{
                                                        const el = e.currentTarget;
                                                        el.style.borderColor = 'var(--accent)';
                                                        el.style.boxShadow = '0 4px 20px rgba(201,151,58,0.1)';
                                                        el.style.transform = 'translateY(-1px)';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        const el = e.currentTarget;
                                                        el.style.borderColor = 'var(--border-subtle)';
                                                        el.style.boxShadow = 'none';
                                                        el.style.transform = 'translateY(0)';
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 16
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: 72,
                                                                    height: 72,
                                                                    borderRadius: 12,
                                                                    flexShrink: 0,
                                                                    background: 'var(--bg-overlay)',
                                                                    overflow: 'hidden',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 24,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: p.thumbnail_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: p.thumbnail_url,
                                                                    style: {
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover'
                                                                    },
                                                                    alt: ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                    lineNumber: 626,
                                                                    columnNumber: 33
                                                                }, this) : '◫'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 619,
                                                                columnNumber: 27
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
                                                                            gap: 8,
                                                                            marginBottom: 6,
                                                                            flexWrap: 'wrap'
                                                                        },
                                                                        children: tags.slice(0, 3).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "tag-pill",
                                                                                children: t.name
                                                                            }, t.id, false, {
                                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                lineNumber: 632,
                                                                                columnNumber: 33
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 630,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        style: {
                                                                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                                            fontSize: 20,
                                                                            fontWeight: 400,
                                                                            lineHeight: 1.2,
                                                                            marginBottom: 6
                                                                        },
                                                                        children: p.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 635,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    p.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            color: 'var(--text-muted)',
                                                                            lineHeight: 1.5,
                                                                            marginBottom: 10
                                                                        },
                                                                        children: [
                                                                            p.description.slice(0, 100),
                                                                            p.description.length > 100 ? '…' : ''
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 642,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 12
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex'
                                                                                },
                                                                                children: collabs.slice(0, 4).map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: {
                                                                                            width: 22,
                                                                                            height: 22,
                                                                                            borderRadius: '50%',
                                                                                            background: 'var(--bg-overlay)',
                                                                                            overflow: 'hidden',
                                                                                            border: '2px solid var(--bg-surface)',
                                                                                            marginLeft: i > 0 ? -7 : 0,
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                            justifyContent: 'center',
                                                                                            fontSize: 9,
                                                                                            color: 'var(--accent)',
                                                                                            position: 'relative',
                                                                                            zIndex: collabs.length - i
                                                                                        },
                                                                                        children: c.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: c.profiles.avatar_url,
                                                                                            style: {
                                                                                                width: '100%',
                                                                                                height: '100%',
                                                                                                objectFit: 'cover'
                                                                                            },
                                                                                            alt: ""
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                            lineNumber: 660,
                                                                                            columnNumber: 41
                                                                                        }, this) : c.profiles?.username?.[0]?.toUpperCase()
                                                                                    }, c.profile_id, false, {
                                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                        lineNumber: 650,
                                                                                        columnNumber: 35
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                lineNumber: 648,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 11,
                                                                                    color: 'var(--text-muted)'
                                                                                },
                                                                                children: [
                                                                                    collabs.length,
                                                                                    " contributor",
                                                                                    collabs.length !== 1 ? 's' : ''
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                lineNumber: 665,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    marginLeft: 'auto',
                                                                                    fontSize: 12,
                                                                                    color: 'var(--accent)'
                                                                                },
                                                                                children: [
                                                                                    "★ ",
                                                                                    p.star_count
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                lineNumber: 668,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 11,
                                                                                    color: 'var(--text-muted)'
                                                                                },
                                                                                children: new Date(p.updated_at ?? p.created_at).toLocaleDateString('en-IN', {
                                                                                    day: 'numeric',
                                                                                    month: 'short'
                                                                                })
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                                lineNumber: 671,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 646,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 25
                                                    }, this)
                                                }, p.id, false, {
                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 23
                                                }, this);
                                            }),
                                            isMember && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/projects/submit",
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 8,
                                                    padding: '14px',
                                                    borderRadius: 14,
                                                    border: '2px dashed var(--border)',
                                                    color: 'var(--text-muted)',
                                                    fontSize: 13,
                                                    transition: 'all 0.2s'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                                    e.currentTarget.style.color = 'var(--accent)';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.borderColor = 'var(--border)';
                                                    e.currentTarget.style.color = 'var(--text-muted)';
                                                },
                                                children: "+ Submit another project"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 681,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 593,
                                        columnNumber: 17
                                    }, this)),
                                    activeSection === 'members' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gap: 10
                                        },
                                        children: members.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/profile/${m.profiles?.username}`,
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 14,
                                                    padding: '16px 20px',
                                                    borderRadius: 14,
                                                    background: 'var(--bg-surface)',
                                                    border: '1px solid var(--border-subtle)',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.2s'
                                                },
                                                onMouseEnter: (e)=>{
                                                    const el = e.currentTarget;
                                                    el.style.borderColor = 'var(--accent)';
                                                    el.style.transform = 'translateX(4px)';
                                                },
                                                onMouseLeave: (e)=>{
                                                    const el = e.currentTarget;
                                                    el.style.borderColor = 'var(--border-subtle)';
                                                    el.style.transform = 'translateX(0)';
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: '50%',
                                                            flexShrink: 0,
                                                            background: 'var(--bg-overlay)',
                                                            overflow: 'hidden',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: 18,
                                                            color: 'var(--accent)',
                                                            border: '2px solid var(--border-subtle)'
                                                        },
                                                        children: m.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: m.profiles.avatar_url,
                                                            style: {
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            },
                                                            alt: ""
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 27
                                                        }, this) : m.profiles?.username?.[0]?.toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    marginBottom: 3
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 15,
                                                                            fontWeight: 500,
                                                                            color: 'var(--text-primary)'
                                                                        },
                                                                        children: m.profiles?.full_name || m.profiles?.username
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 733,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleBadge, {
                                                                        role: m.role
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 736,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    m.profile_id === userId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 9,
                                                                            color: 'var(--text-muted)',
                                                                            background: 'var(--bg-overlay)',
                                                                            padding: '1px 6px',
                                                                            borderRadius: 99
                                                                        },
                                                                        children: "You"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                        lineNumber: 738,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 732,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: [
                                                                    "@",
                                                                    m.profiles?.username
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                lineNumber: 743,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 21
                                                    }, this),
                                                    m.profiles?.github_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: m.profiles.github_url,
                                                        target: "_blank",
                                                        rel: "noopener",
                                                        onClick: (e)=>e.stopPropagation(),
                                                        style: {
                                                            fontSize: 13,
                                                            color: 'var(--text-muted)',
                                                            padding: '6px 10px',
                                                            borderRadius: 8,
                                                            background: 'var(--bg-overlay)',
                                                            border: '1px solid var(--border-subtle)'
                                                        },
                                                        children: "⌥ GitHub"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 749,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 18,
                                                            color: 'var(--border)',
                                                            marginLeft: 4
                                                        },
                                                        children: "›"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 756,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, m.profile_id, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 701,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, this),
                                    activeSection === 'resources' && (resources.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: 'center',
                                            padding: '60px 40px',
                                            background: 'var(--bg-surface)',
                                            border: '2px dashed var(--border)',
                                            borderRadius: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 40,
                                                    opacity: 0.2,
                                                    marginBottom: 12
                                                },
                                                children: "◎"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 771,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 22,
                                                    marginBottom: 8
                                                },
                                                children: "No shared resources yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 772,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 13,
                                                    color: 'var(--text-muted)',
                                                    marginBottom: 16
                                                },
                                                children: "Leaders can add GitHub, Figma, Drive links and more."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 775,
                                                columnNumber: 19
                                            }, this),
                                            isLeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditing(true),
                                                style: {
                                                    padding: '10px 22px',
                                                    borderRadius: 10,
                                                    background: 'var(--accent-dim)',
                                                    border: '1px solid var(--accent)',
                                                    color: 'var(--accent)',
                                                    fontSize: 13,
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit'
                                                },
                                                children: "Add Resources →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 779,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gap: 10
                                        },
                                        children: resources.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResourceCard, {
                                                href: r.href,
                                                label: r.label,
                                                icon: r.icon
                                            }, i, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 791,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 789,
                                        columnNumber: 17
                                    }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    marginBottom: 12
                                                },
                                                children: "Recent Activity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 807,
                                                columnNumber: 15
                                            }, this),
                                            activity.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: 10,
                                                        padding: '9px 0',
                                                        borderBottom: i < activity.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 26,
                                                                height: 26,
                                                                borderRadius: 7,
                                                                flexShrink: 0,
                                                                background: 'var(--bg-overlay)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: 12
                                                            },
                                                            children: a.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                            lineNumber: 819,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: 1,
                                                                minWidth: 0
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        color: 'var(--text-secondary)',
                                                                        lineHeight: 1.4
                                                                    },
                                                                    children: a.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                    lineNumber: 828,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: 'var(--text-muted)',
                                                                        marginTop: 2
                                                                    },
                                                                    children: a.time
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                                    lineNumber: 829,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                            lineNumber: 827,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 802,
                                        columnNumber: 13
                                    }, this),
                                    isLeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    marginBottom: 12
                                                },
                                                children: "Quick Invite"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 842,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: inviteUsername,
                                                        onChange: (e)=>setInviteU(e.target.value),
                                                        placeholder: "@username",
                                                        style: {
                                                            flex: 1,
                                                            padding: '9px 12px',
                                                            borderRadius: 8,
                                                            fontSize: 13
                                                        },
                                                        onKeyDown: (e)=>e.key === 'Enter' && inviteMember()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 846,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: inviteMember,
                                                        disabled: inviting,
                                                        style: {
                                                            padding: '9px 14px',
                                                            background: 'var(--accent)',
                                                            color: '#1c1917',
                                                            border: 'none',
                                                            borderRadius: 8,
                                                            cursor: 'pointer',
                                                            fontFamily: 'inherit',
                                                            fontSize: 13,
                                                            fontWeight: 600
                                                        },
                                                        children: inviting ? '…' : 'Send'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 850,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 845,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 837,
                                        columnNumber: 15
                                    }, this),
                                    resources.length > 0 && activeSection !== 'resources' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 16,
                                            padding: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 10,
                                                            letterSpacing: '0.15em',
                                                            color: 'var(--text-muted)',
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Resources"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 869,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSection('resources'),
                                                        style: {
                                                            fontSize: 11,
                                                            color: 'var(--accent)',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontFamily: 'inherit'
                                                        },
                                                        children: "View all →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 872,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 868,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gap: 8
                                                },
                                                children: resources.slice(0, 3).map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResourceCard, {
                                                        href: r.href,
                                                        label: r.label,
                                                        icon: r.icon
                                                    }, i, false, {
                                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                                lineNumber: 879,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                        lineNumber: 863,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                                lineNumber: 799,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                        lineNumber: 546,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/teams/[id]/page.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/teams/[id]/page.tsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
_s(TeamPage, "96B27iSvbaK1aH52fHCiubKNNEM=");
_c2 = TeamPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RoleBadge");
__turbopack_context__.k.register(_c1, "ResourceCard");
__turbopack_context__.k.register(_c2, "TeamPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_%28main%29_teams_%5Bid%5D_page_tsx_f16dc47c._.js.map