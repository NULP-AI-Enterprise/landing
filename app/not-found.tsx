import NotFound404 from '@/components/NotFound404';

export default function GlobalNotFound() {
    return (
        <html lang="uk">
        <body style={{ margin: 0 }}>
            <NotFound404 homeHref="/uk" />
        </body>
        </html>
    );
}
