import Image from 'next/image'

const Confirmation = () => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <Image src="/images/icon-complete.svg" width={80} height={80} alt="Complete" />
            <h2 className="text-2xl">Thank You!</h2>
            <p>We've added your card details</p>
            <a href="/" className="bg-purple-700 text-white py-2 px-4 rounded">Continue</a>
        </div>
    )
}

export default Confirmation
