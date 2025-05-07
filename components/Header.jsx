import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HeaderComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    
    useEffect(() => {
        const handleClickOutside = (event) => { 
            if (menuRef.current && !menuRef.current.contains(event.target)) { 
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleActivitiesClick = () => {
        setIsMenuOpen(false);
        console.log("Navigating to Activities");
    };

    const handleFavoritesClick = () => {
        setIsMenuOpen(false);
        console.log("Navigating to Favorites");
    };

    return (
        <header>
            <div>
                <div>
                    Logo
                </div>
                <nav ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <img
                                src="/img/x.svg" 
                                alt="Close Menu"
                                size="24px"
                            />
                        ) : (
                            <img
                                src="/img/menu.svg" 
                                alt="Open Menu"
                                size="24px"
                            />
                        )}
                    </button>
                    {isMenuOpen && (
                        <ul>
                            <li>
                                <Link href="/activities">
                                    <button onClick={handleActivitiesClick}>
                                        Activities
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites">
                                    <button onClick={handleFavoritesClick}>
                                        Favorites
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default HeaderComponent;
