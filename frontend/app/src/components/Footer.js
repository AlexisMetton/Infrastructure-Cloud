import React from "react";

function Footer() {
    return (
        <footer className="bg-black text-white p-4 mt-10">
            <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Amicale Nationale des Nations Amies (ANNA)</p>
            </div>
        </footer>
    )
}

export default Footer;