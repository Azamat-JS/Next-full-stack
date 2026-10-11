'use client'

import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"

const ImageTabs = () => {
    const [activeTab, setActiveTab] = useState("organize")
    return (
        <section className="border-t bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">

                    {/* Tabs */}
                    <div className="flex gap-2 justify-center mb-8">
                        <Button
                            onClick={() => setActiveTab("organize")}
                            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'organize' ? "bg-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >Organize Applications</Button>
                        <Button
                            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'hired' ? "bg-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            onClick={() => setActiveTab("hired")}
                        >Get Hired</Button>
                        <Button
                            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'boards' ? "bg-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            onClick={() => setActiveTab("boards")}>Manage Boards</Button>
                    </div>
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border-gray-200 shadow-xl">
                        {activeTab === 'organize' && (<Image src="/hero-images/hero1.png" width={1200} height={800} alt="Organize Applications" />)}

                        {activeTab === 'hired' && (<Image src="/hero-images/hero2.png" width={1200} height={800} alt="Get Hired Applications" />)
                        }
                        {activeTab === 'boards' && (<Image src="/hero-images/hero3.png" width={1200} height={800} alt="Manage boards" />)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ImageTabs