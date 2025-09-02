"use client";

import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect, // Alterado de signInWithPopup
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
    // A função signInWithRedirect não retorna um resultado diretamente.
    // O resultado é obtido após o redirecionamento.
    await signInWithRedirect(auth, provider);
    // Como a página será recarregada, o resultado será processado pelo onAuthStateChanged
    // que já temos observando o estado do usuário. Por isso, não precisamos retornar nada aqui.
    return { user: null, error: null }; 
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
