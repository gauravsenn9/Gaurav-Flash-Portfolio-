import { describe, expect, it } from 'vitest';
import { projects, site, seo } from '@/lib/portfolio';
import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
describe('Portfolio integrity',()=>{
 it('preserves the original catalogue and adds WhatsApp honestly',()=>{expect(projects).toHaveLength(15);expect(new Set(projects.map(p=>p.slug)).size).toBe(15);expect(projects.flatMap(p=>p.resources)).toHaveLength(70);const original=projects.filter(p=>p.slug!=='whatsapp-directory');expect(original.every(p=>p.sections.length===8)).toBe(true);expect(original.every(p=>p.resources.some(r=>r.primary))).toBe(true);const whatsapp=projects.find(p=>p.slug==='whatsapp-directory');expect(whatsapp?.resources).toHaveLength(3);expect(whatsapp?.status).toContain('research');});
 it('matches all project routes and library',()=>{const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});for(const project of projects)expect(router.matchRoutes(`/projects/${project.slug}/`).at(-1)?.routeId).toBe('/projects/$slug');expect(router.matchRoutes('/projects/').at(-1)?.routeId).toBe('/projects/');});
 it('keeps exact contact destinations and per-project SEO',()=>{expect(site.booking).toBe('https://topmate.io/gaurav_sen9/');expect(site.email).toBe('mailto:gauravsenn9@gmail.com');expect(site.linkedin).toBe('https://www.linkedin.com/in/gauravsenn/');for(const p of projects){const head=seo(p.name,p.summary,`/projects/${p.slug}/`);expect(head.meta).toContainEqual({title:p.name});expect(head.links[0]?.href).toContain(`/projects/${p.slug}/`);}});
});
