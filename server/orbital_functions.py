from math import *

EPSILON = 1e-12


# ------------------------------------------------------------ ORBITAL FUNCTIONS ---------------------------------------------------------------------------------------
# Using the aphelion (M) and perihelion (m) to find the width and height of the ellipse of the orbit
# aphelion (M) = max distance from sun
# perihelion (m) = min distance from sun
# The width and height are used to plot the orbit
def OrbitLength(M, m):
    a = (M + m) / 2  # semi-major axis
    c = a - m  # distance from center to focus point
    e = c / a  # eccentricity of ellipse
    b = a * (1 - e**2) ** 0.5  # semi-minor axis

    width = 2 * a
    height = 2 * b
    return width, height


# Finds roots of the function fn between intervals xmin and xmax using the bisection method to the precision of epsilon
def solve_bisection(fn, xmin, xmax, epsilon=EPSILON):
    while True:
        xmid = (xmin + xmax) * 0.5

        # check if the precision threshold is met
        if xmax - xmin < epsilon:
            return xmid

        # Evaluate fn at mid and min points
        fn_mid = fn(xmid)
        fn_min = fn(xmin)

        # Narrow down root to right or left half
        if fn_min * fn_mid < 0:
            xmax = xmid  # left half
        else:
            xmin = xmid  # right half


# Finding the angle theta and distance (r) from the sun using Keplers Laws of Planetary Motion
# This gives us the position of the object (r, theta) as a function of time (t)
# Source: https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion#Position_as_a_function_of_time
def SolveOrbit(M, m, t):
    """
    M = distance from aphelion
    m = distance from perihelion
    t = time
    """
    # Constants
    Msun = 1.9891e30  # Mass of the Sun [kg]
    G = 6.6740831e-11  # Gravitational constant [N*m^2/kg^2]
    mu = G * Msun  # Standard gravitational parameter

    # Orbital elements
    e = (M - m) / (M + m)  # Eccentricity
    p = m * (1 + e)  # Semi-latus rectum
    a = p / (1 - e**2)  # Semi-major axis
    P = sqrt(a**3 / mu)  # Orbital period
    # Mean anomaly
    M = (t / P) % (2 * pi)

    # Eccentric anomaly using the bisection method
    def fn_E(E):
        return M - (E - e * sin(E))

    E = solve_bisection(fn_E, 0, 2 * pi)

    # True anomaly
    theta = 2 * atan(sqrt((((1 + e) * tan(E / 2) ** 2) / (1 - e))))
    if E > pi:
        theta = 2 * pi - theta

    # Heliocentric distance
    r = a * (1 - e * cos(E))

    return theta, r
