const firebaseConfig = {
            apiKey: "AIzaSyB-rDQ1Z6nskNhjXhc-lXYqWLMkJfniEL8",
            authDomain: "jayakrishna-e7270.firebaseapp.com",
            projectId: "jayakrishna-e7270",
            storageBucket: "jayakrishna-e7270.appspot.com",
            messagingSenderId: "1087978493706",
            appId: "1:1087978493706:web:01821105afe672fbf20cf3",
            measurementId: "G-LK191YHJTQ"
          };


          firebase.initializeApp(firebaseConfig);
          const auth = firebase.auth();
          const firestore = firebase.firestore();

        // Function to sign in with Google
        function signInWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user.displayName + ' signed in');

                    saveUserToFirestore(user);

                    // Redirect to resume.html
                  //  window.location.href = 'resume.html';
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }

        function saveUserToFirestore(user) {
            // Reference to the users collection in Firestore
            const usersCollection = firestore.collection('jayakrishna');
        
            // Get the current sign-in count and sign-in time from Firestore and update them
            usersCollection.doc(user.uid).get().then((doc) => {
                let signInCount = 1; // Default value if user is signing in for the first time
                let signInTime = new Date(); // Timestamp when the user signs in
        
                if (doc.exists) {
                    // If the user document already exists, get the current signInCount and signInTime
                    const userData = doc.data();
                    signInCount = userData.signInCount + 1 || 1; // Increment signInCount or set to 1 if undefined
                    signInTime = new Date(); // Update signInTime for existing user
                }
        
                // Set the user data in Firestore with the updated signInCount and signInTime
                usersCollection.doc(user.uid).set({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    signInCount: signInCount,
                    signInTime: signInTime,
                    // Add more fields as needed
                }).then(() => {
                    console.log('User data saved to Firestore');
                    window.location.href = 'resume.html';
                }).catch((error) => {
                    console.error('Error saving user data to Firestore:', error.message);
                });
            }).catch((error) => {
                console.error('Error getting user data from Firestore:', error.message);
            });
        }
        
        
        function login() {
            var username = document.getElementById('username').value;
            var passwordInput = document.getElementById('password');
            var password = passwordInput.value;

            // Check credentials
            switch (username) {
                case 'admin':
                    if (password === 'admin') {
                        // Redirect to the resume page for admin
                        window.location.href = 'resume.html';
                    } else {
                        alert('Invalid password. Please try again.');
                    }
                    break;
                case 'jayakrishna':
                    if (password === 'jayakrishna') {
                        // Redirect to myresume page for jayakrishna
                        window.location.href = 'myresume.html';
                    } else {
                        alert('Invalid password. Please try again.');
                    }
                    break;
                case 'jaya':
                    if (password === 'jaya') {
                        // Redirect to node page for jaya
                        window.location.href = 'node.html';
                    } else {
                        alert('Invalid password. Please try again.');
                    }
                    break;
                default:
                    alert('Invalid username. Please try again.');
            }
        }

        function togglePassword() {
            var passwordInput = document.getElementById('password');
            var eyeIcon = document.querySelector('.eye-icon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.textContent = '👁️';
            } else {
                passwordInput.type = 'password';
                eyeIcon.textContent = '👁️';
            }
        }