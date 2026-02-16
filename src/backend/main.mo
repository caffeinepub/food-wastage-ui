import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  // Initialize the authorization component state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type PostId = Nat;

  public type FoodDonationPost = {
    id : PostId;
    donor : Principal;
    title : Text;
    location : Text;
    foodType : Text;
    state : Text;
    quantity : Nat;
    expiryDate : Text;
    pickupTime : Text;
    image : Text;
    createdAt : Int;
    category : Category;
    description : Text;
    ngoId : ?Principal;
    pickupStatus : PickupStatus;
    recipientId : ?Principal;
    recipientName : ?Text;
    recipientContact : ?Text;
    accessCode : ?Text;
  };

  public type Category = {
    #fruitsVegetables;
    #dairy;
    #bakery;
    #meatFish;
    #pantry;
    #frozen;
    #preparedMeals;
    #beverages;
    #other;
  };

  public type PickupStatus = {
    #available;
    #booked;
    #pickedUp;
    #delivered;
  };

  public type TrackingStep = {
    title : Text;
    timestamp : Int;
    status : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let posts = Map.empty<PostId, FoodDonationPost>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextId = 1;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createPost(
    title : Text,
    location : Text,
    foodType : Text,
    state : Text,
    quantity : Nat,
    expiryDate : Text,
    pickupTime : Text,
    image : Text,
    category : Category,
    description : Text,
    ngoId : ?Principal,
  ) : async FoodDonationPost {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };

    if (quantity < 1) {
      Runtime.trap("Quantity must be at least 1");
    };

    let post : FoodDonationPost = {
      id = nextId;
      donor = caller;
      title;
      location;
      foodType;
      state;
      quantity;
      expiryDate;
      pickupTime;
      image;
      category;
      description;
      ngoId;
      createdAt = Time.now();
      pickupStatus = #available;
      recipientId = null;
      recipientName = null;
      recipientContact = null;
      accessCode = null;
    };

    posts.add(nextId, post);
    nextId += 1;
    post;
  };

  public query ({ caller }) func getMyPosts() : async [FoodDonationPost] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their posts");
    };
    posts.values().toArray().filter(func(post) { post.donor == caller });
  };

  public query ({ caller }) func getNearestListings() : async [FoodDonationPost] {
    posts.values().toArray().filter(func(post) { post.quantity > 0 });
  };

  public query ({ caller }) func getHealthyListings() : async [FoodDonationPost] {
    posts.values().toArray().filter(
      func(post) {
        switch (post.category) {
          case (#fruitsVegetables or #dairy or #meatFish) { true };
          case (_) { false };
        };
      }
    );
  };

  public query ({ caller }) func getVegListings() : async [FoodDonationPost] {
    posts.values().toArray().filter(
      func(post) {
        switch (post.category) {
          case (#fruitsVegetables or #bakery) { true };
          case (_) { false };
        };
      }
    );
  };

  public query ({ caller }) func getAllPosts() : async [FoodDonationPost] {
    posts.values().toArray();
  };

  public query ({ caller }) func getCurrentTracking() : async [TrackingStep] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tracking");
    };

    let userPosts = posts.values().toArray().filter(func(post) { post.donor == caller });

    if (userPosts.size() == 0) {
      return [];
    };

    let mostRecent = userPosts.foldLeft(userPosts[0], func(latest, current) { if (current.createdAt > latest.createdAt) { current } else { latest } });

    getTrackingSteps(mostRecent);
  };

  func getTrackingSteps(post : FoodDonationPost) : [TrackingStep] {
    let trackingSteps = List.empty<TrackingStep>();

    trackingSteps.add({
      title = "Donation posted";
      timestamp = post.createdAt;
      status = "created";
    });

    if (post.pickupStatus == #booked or post.pickupStatus == #pickedUp or post.pickupStatus == #delivered) {
      trackingSteps.add({
        title = "Booked by recipient";
        timestamp = post.createdAt + 1_000_000_000;
        status = "booked";
      });
    };

    if (post.pickupStatus == #pickedUp or post.pickupStatus == #delivered) {
      trackingSteps.add({
        title = "Picked up";
        timestamp = post.createdAt + 2_000_000_000;
        status = "pickedUp";
      });
    };

    if (post.pickupStatus == #delivered) {
      trackingSteps.add({
        title = "Delivered";
        timestamp = post.createdAt + 3_000_000_000;
        status = "delivered";
      });
    };

    trackingSteps.toArray();
  };
};
