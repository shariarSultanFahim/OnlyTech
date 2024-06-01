/* eslint-disable react/prop-types */

const Header = ({title,subtitle}) => {
    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl">{title}</h1>
            <p className="opacity-80 text-md md:text-lg lg:text-xl">{subtitle}</p>
        </div>
    );
};

export default Header;