import Link from 'next/link';
const Navbar = ()=>{
    return (
        <div>
            <ul className="nav">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/upload">Upload</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
            <style jsx >{`
                
            `}</style>
        </div>
    );
}

export default Navbar;