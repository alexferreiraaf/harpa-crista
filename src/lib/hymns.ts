import { db } from './firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';

export interface Hymn {
  id: string;
  number: number;
  title: string;
  lyrics: string[];
  audioUrl: string;
  instrumentalUrl: string;
}

export const getHymnById = async (id: string): Promise<Hymn | undefined> => {
  try {
    const docRef = doc(db, 'hymns', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Ensure lyrics is an array of strings
      const lyrics = Array.isArray(data.lyrics) ? data.lyrics.map(String) : [];
      return {
        id: docSnap.id,
        number: data.number,
        title: data.title,
        lyrics: lyrics,
        audioUrl: data.audioUrl || '',
        instrumentalUrl: data.instrumentalUrl || '',
      };
    } else {
      console.log('No such document!');
      return undefined;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return undefined;
  }
};

export const getAllHymns = async (): Promise<Hymn[]> => {
  try {
    const hymnsCollection = collection(db, 'hymns');
    const q = query(hymnsCollection, orderBy('number'));
    const querySnapshot = await getDocs(q);
    const hymns: Hymn[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure lyrics is an array of strings
        const lyrics = Array.isArray(data.lyrics) ? data.lyrics.map(String) : [];
        hymns.push({
            id: doc.id,
            number: data.number,
            title: data.title,
            lyrics: lyrics,
            audioUrl: data.audioUrl || '',
            instrumentalUrl: data.instrumentalUrl || '',
        });
    });
    return hymns;
  } catch (error) {
      console.error("Error fetching hymns: ", error);
      return [];
  }
};
