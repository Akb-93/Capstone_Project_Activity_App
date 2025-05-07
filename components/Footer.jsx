import React from 'react';
import Link from 'next/link';


const FooterComponent = () => {
    return (
        <footer>
            <ul>
                <li>
                    <Link href="/activities">
                        Activities
                    </Link>
                </li>
                <li>
                    <Link href="/favorites">
                        Favorites
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default FooterComponent;
