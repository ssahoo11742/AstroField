# AstroField

A personal project made to visualize the orbits of Near-Earth Objects (NEOs). Provides additional features such as risk assesment, close approaches, and orbit propagation.

![Untitled](https://github.com/user-attachments/assets/5912cde5-a052-434a-a11a-5d1fe160c985)

<br>

# Description
AstroField is an interactive app that tracks near-Earth asteroids in real-time, offering users stunning 3D visualizations of their orbits. It provides detailed information on each asteroid, including impact probabilities and close approaches, allowing users to explore the dynamics of these celestial bodies and stay updated on their paths. The app is designed for anyone curious about astronomy, space, or astrophysics. AstroField simplifies complex data by offering an easy-to-use 3D interface that visualizes asteroid positions from 1900 to 2100, making space exploration accessible and engaging for all users.

<br>

# Features

#### 1. Visualization of asteroids in 3d
  - We use 3js to render the asteroids in 3d space. The positional values of the asteroids are computed by using procedure proposed by Paul Schlyter.
#### 2. Visualization of orbits
  - Orbits are visualized by finding locations of the body in equally spaced time over it's orbital period. A Catmull Rom curve is then generating to create it's orbit. This is why the orbits are uncertain near the Sun as they move faster there.
  - One can search a specific body to add it's orbit to the 3d scene
#### 3. Risk Assessment
  - For every body, the following is provided to access its risk of impact:
    - Palerno Scale Rating (Cum.)
    - Torino Scale Rating (Max)
    - Impact Probability (for the next 100 years)
    - Number of Potential Impacts (for the next 100 years)
#### 4. Body Specific Details
  - For every body, the following is provided as general information:
    - Diameter 
    - Orbital Period
    - Rotational Period
    - Orbit Producer
    - Geometric Albedo
#### 5. Close Approach
  - For every body, the following is provided to access close approaches:
    - Number of close approaches untill year 2100
    - Next close approach date
#### 6. Orbit Propagation
  - You can propagate the bodies in their orbit by using the timeline to select a specific date, or the speed bar to increase the speed
  - Buttons are provided to pause the propagation as well as going back to the current date and time (live)

# Images
Here is a collection of images that showcase the features above
![image](https://github.com/user-attachments/assets/f01c43b9-e33a-47bf-aa09-1eee02bc77cc)
![image](https://github.com/user-attachments/assets/c2818f80-e01e-4fd3-9c8b-e42c0eabe947)
![image](https://github.com/user-attachments/assets/b67f86e2-8c4b-4406-8248-da868950472b)

# Documentation
Work in Progress

# Tech Stack
- Python
- JS/HTML/CSS
- Three.js
- React.js
- React-Three-Fiber

# Citations and Resources
- [NASA CNEOS Sentry API](https://cneos.jpl.nasa.gov/sentry/)
- [NASA Small-Body Database (SBDB)](https://ssd.jpl.nasa.gov/tools/sbdb_query.html#!#results)
- [NASA CNEOS Close Approach API](https://cneos.jpl.nasa.gov/ca/)
- [Paul Schlyter's algorithm on how to compute planetary positions](https://stjarnhimlen.se/comp/tutorial.html)




