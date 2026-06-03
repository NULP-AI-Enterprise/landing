import AdminDashboard from "@/components/admin/AdminDashboard";

// Сервер використовує внутрішню адресу
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getInitialData() {
    try {
        const [tRes, uRes, pRes, nRes] = await Promise.all([
            fetch(`${NEXT_PUBLIC_API_URL}/department-web-api/teachers/v1?pageNumber=1&pageSize=1000`, { cache: 'no-store' }),
            fetch(`${NEXT_PUBLIC_API_URL}/department-web-api/universities/v1?pageNumber=1&pageSize=1000`, { cache: 'no-store' }),
            fetch(`${NEXT_PUBLIC_API_URL}/department-web-api/projects/v1?pageNumber=1&pageSize=1000`, { cache: 'no-store' }),
            fetch(`${NEXT_PUBLIC_API_URL}/department-web-api/news/v1?pageNumber=1&pageSize=1000`, { cache: 'no-store' })
        ]);

        const tData = tRes.ok ? await tRes.json() : { content: [] };
        const uData = uRes.ok ? await uRes.json() : { content: [] };
        const pData = pRes.ok ? await pRes.json() : { content: [] };
        const nData = nRes.ok ? await nRes.json() : { content: [] };

        return {
            initialTeachers: tData.content || [],
            initialUnis: uData.content || [],
            initialProjects: pData.content || [],
            initialNews: nData.content || []
        };
    } catch (e) {
        console.error("Server fetch failed:", e);
        return { initialTeachers: [], initialUnis: [], initialProjects: [], initialNews: [] };
    }
}

export default async function AdminPage() {
    const { initialTeachers, initialUnis, initialProjects, initialNews } = await getInitialData();

    return (
        <div className="min-h-screen bg-surface text-t-primary p-8 pt-32">
            <div className="max-w-7xl mx-auto">
                <AdminDashboard
                    initialTeachers={initialTeachers}
                    initialUnis={initialUnis}
                    initialProjects={initialProjects}
                    initialNews={initialNews}
                />
            </div>
        </div>
    );
}