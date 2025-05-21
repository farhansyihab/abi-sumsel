// Fungsi untuk membandingkan data
export function hasDataChanged(oldData, newData) {
  if (!oldData || !newData) return true;
  
  // Bandingkan berdasarkan timestamp atau hash sederhana
  return (
    oldData._timestamp !== newData._timestamp ||
    oldData.items?.length !== newData.items?.length
  );
}

// Fungsi utama pengecekan update
export async function checkForUpdates(kunciBlog, callback) {
  try {
    const oldData = JSON.parse(window.localStorage.getItem("dataBlog"));
    const freshData = await fetchBlogDataDirectly(kunciBlog);
    
    if (hasDataChanged(oldData, freshData)) {
      console.log("[Updater] Data blog berubah");
      callback?.(); // Panggil callback jika ada perubahan
      return true;
    }
    return false;
  } catch (error) {
    console.error("[Updater] Error:", error);
    return false;
  }
}

// Fungsi bantuan untuk fetch langsung
async function fetchBlogDataDirectly({kunci, blogId}) {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${kunci}`;
  const res = await fetch(url);
  const data = await res.json();
  
  return {
    ...data,
    _timestamp: Date.now() // Tambahkan timestamp
  };
}