export async function generateTravelPhoto() {
  try {
    const response = await fetch('/api/replicate/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: "Beautiful travel destination landscape, scenic mountain vista with crystal clear lake reflection, golden hour lighting, serene and inspiring natural scenery, high resolution, professional photography style, wanderlust inspiring"
      }),
    });

    if (!response.ok) {
      // Fallback to a beautiful Unsplash travel image if API fails
      return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    }

    const data = await response.json();
    
    // The output is typically an array of URLs
    const imageUrl = Array.isArray(data.output) ? data.output[0] : data.output;
    
    return imageUrl;
  } catch (error) {
    console.error('Error generating travel photo:', error);
    // Fallback to a beautiful Unsplash travel image
    return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  }
}

export async function downloadAndSaveImage(imageUrl: string, filename: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Convert blob to base64 for saving
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
} 