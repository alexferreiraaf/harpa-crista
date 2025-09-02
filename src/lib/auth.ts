"use client";

import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  signInAnonymously
} from "firebase/auth";

setPersistence(auth, browserLocalPersistence);

export async function signUpWithEmail(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return { user: null, error };
  }
}

export async function signInAsGuest() {
  try {
    const userCredential = await signInAnonymously(auth);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Anonymous Sign-In Error:", error);
    return { user: null, error };
  }
}

export function observeUser(callback: (user: any) => void) {
  return auth.onAuthStateChanged(callback);
}

export async function signOutUser() {
  try {
    await auth.signOut();
    return { error: null };
  } catch (error) {
    return { error };
  }
}
