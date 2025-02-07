import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Welcome = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-1 flex items-center justify-center bg-blue-50 p-8">
                <div className="max-w-3xl text-center space-y-6">
                    <img
                        src="/public/icon.png"
                        alt="Task Manager Icon"
                        className="w-20 mx-auto"
                    />
                    <h1 className="text-5xl font-extrabold text-blue-600 drop-shadow-md">
                        Welcome to Task Manager
                    </h1>
                    <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                        Organize your tasks efficiently and keep track of your progress with ease.
                    </p>
                    <div>
                        <a
                            href="/login"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-xl font-semibold transition-all hover:bg-blue-500"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </main>


            <Footer />
        </div>
    );
};

export default Welcome;
