import React from "react";
import useDiskusiAduan from "../../Hooks/useDiskusiAduan";
import iconGemeni from "../../assets/icon.svg";
import Hapus from "../../assets/delete_24px.svg";

const DiskusiAduan = ({ complaint, discussions }) => {
    const {
        recommendation,
        setRecommendation,
        textInput,
        setTextInput,
        isSubmitting,
        isFetchingRecommendation,
        newDiscussion,
        error,
        handleDeleteDiscussion,
        fetchRecommendation,
        postDiscussion,
    } = useDiskusiAduan(complaint, discussions);

    return (
        <div className="bg-white w-full rounded-2xl py-4 px-5 flex flex-col gap-4">
            <h5 className="font-poppins font-semibold text-2xl">Diskusi Aduan</h5>
            <section className="flex flex-col">
                <div className="bg-main-color p-4">
                    <p>
                        No Aduan <span>{complaint.id}</span>
                    </p>
                </div>
            </section>
            <div className="h-72 overflow-y-auto">
                {error ? (
                    <p className="text-center text-gray-500 mt-4">{error}</p>
                ) : discussions.length > 0 ? (
                    discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            className={`border-b border-light-1 p-2 flex flex-col gap-3 ${
                                discussion.user_id ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                        >
                            {/* Placeholder untuk informasi pengguna */}
                            <img
                                src=""
                                alt="User/Admin avatar"
                                className="rounded-full ml-4"
                                style={{ width: "40px", height: "40px" }}
                            />
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-bold">
                                            {discussion.user_id ? "Nama User" : "Nama Admin"} {/* Ganti dengan logika untuk mendapatkan nama yang benar */}
                                        </span>
                                        <span className="text-gray-500 text-sm ml-2">
                                            {discussion.update_at || "Tanggal tidak tersedia"}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteDiscussion(discussion.id)}
                                        className="text-red-500 flex items-center"
                                    >
                                        <img src={Hapus} alt="" className="w-4 h-4 mr-1" />
                                        Hapus
                                    </button>
                                </div>
                                <p>{discussion.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">Tidak ada diskusi.</p>
                )}
                {newDiscussion && (
                    <div className="border-b border-light-1 p-2 flex flex-col gap-3 md:flex-row-reverse">
                        <img
                            src=""
                            alt="Admin avatar"
                            className="rounded-full mr-4"
                            style={{ width: "40px", height: "40px" }}
                        />
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleDeleteDiscussion(newDiscussion.id)}
                                    className="text-red-500 flex items-center"
                                >
                                    <img src={Hapus} alt="" className="w-4 h-4 mr-1" /> Hapus
                                </button>
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        {newDiscussion.update_at || "Tanggal tidak tersedia"}
                                    </span>
                                    <span className="font-bold ml-2">
                                        {newDiscussion.admin_id ? "Nama Admin" : "Nama tidak tersedia"} {/* Ganti dengan logika untuk mendapatkan nama yang benar */}
                                    </span>
                                </div>
                            </div>
                            <p className="text-right">{newDiscussion.comment}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full">
                <button
                    className={`flex w-full justify-center items-center rounded border border-dark-4 py-2 px-5 gap-1 ${
                        isFetchingRecommendation ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={fetchRecommendation}
                    disabled={isFetchingRecommendation}
                >
                    <img src={iconGemeni} alt="icon" />
                    <p className="bg-gradient-to-r from-[#4796E3] to-[#C96676] text-transparent bg-clip-text">
                        {isFetchingRecommendation
                            ? "Harap tunggu..."
                            : "Get Rekomendasi AI"}
                    </p>
                </button>
                <textarea
                    className="w-full mt-5 border border-gray-300 rounded p-2 min-h-28"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    disabled={isSubmitting}
                    cols="30"
                ></textarea>
                <button
                    className={`text-info-3 bg-white border border-info-3 px-6 py-2.5 rounded shadow mt-3 font-medium ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={postDiscussion}
                    disabled={isSubmitting}
                >
                    Kirim Diskusi
                </button>
            </div>
        </div>
    );
};

export default DiskusiAduan;
