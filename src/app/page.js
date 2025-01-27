"use client";

const InfoPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white p-4 shadow">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Information Page</h1>
            </header>
            <main className="flex-grow p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Responsive Info Page</h2>
                    <p className="text-lg text-gray-600">This is a responsive information page with a banner header.</p>
                </div>
            </main>
            <footer className="bg-white p-4 text-center">
                Info Page ©2023 Created by YourName
            </footer>
        </div>
    );
};

export default InfoPage;
