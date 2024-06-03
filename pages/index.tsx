import Head from 'next/head';
import CodeEditor from '../components/codeEditor'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Datacurve Code Execution Challenge</title>
                <meta name='description' content='code execution challenge' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main>
                <h1 className='text-4xl font-bold text-center mt-10'>Datacurece Code Execution Challenge</h1>
                <CodeEditor />
            </main>
        </div>
    );
}