import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export type PostId = bigint;
export interface TrackingStep {
    status: string;
    title: string;
    timestamp: bigint;
}
export interface FoodDonationPost {
    id: PostId;
    title: string;
    expiryDate: string;
    createdAt: bigint;
    recipientContact?: string;
    accessCode?: string;
    description: string;
    state: string;
    ngoId?: Principal;
    pickupTime: string;
    quantity: bigint;
    category: Category;
    pickupStatus: PickupStatus;
    image: string;
    recipientName?: string;
    donor: Principal;
    location: string;
    recipientId?: Principal;
    foodType: string;
}
export enum Category {
    preparedMeals = "preparedMeals",
    other = "other",
    bakery = "bakery",
    meatFish = "meatFish",
    fruitsVegetables = "fruitsVegetables",
    frozen = "frozen",
    beverages = "beverages",
    dairy = "dairy",
    pantry = "pantry"
}
export enum PickupStatus {
    booked = "booked",
    available = "available",
    pickedUp = "pickedUp",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, location: string, foodType: string, state: string, quantity: bigint, expiryDate: string, pickupTime: string, image: string, category: Category, description: string, ngoId: Principal | null): Promise<FoodDonationPost>;
    getAllPosts(): Promise<Array<FoodDonationPost>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentTracking(): Promise<Array<TrackingStep>>;
    getHealthyListings(): Promise<Array<FoodDonationPost>>;
    getMyPosts(): Promise<Array<FoodDonationPost>>;
    getNearestListings(): Promise<Array<FoodDonationPost>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVegListings(): Promise<Array<FoodDonationPost>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
