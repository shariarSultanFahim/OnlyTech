
const Banner = () => {
    return (
        <div className="mx-auto w-full flex flex-col-reverse lg:flex-row text-center lg:text-left justify-between items-center bg-primaryColor max-w-screen-xl">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl">Discover the future of tech.</h1>
                <p className="opacity-80 text-xl md:text-2xl lg;text-3xl">Find & share amazing web apps, AI tools, & more on Product Hunt.</p>
                <button className="btn bg-bgColor border-none ">Hunt Products Now</button>
            </div>
            <div className="h-2/3 w-2/3">
                <img className="h-full w-full" src="/manlookingatlaptop.png" alt="Man looking at laptop" />
            </div>
        </div>
    );
};

export default Banner;