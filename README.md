# Technical Overview
1. The home component loads a world map SVG contained in svg.component.html. A mouse event listener is attached in svg.component.ts.
2. When a country is clicked, a GET request containing the 2-letter ISO A-2 country code (from the SVG file) is sent to World Bank's basic API.
3. While the app is waiting for a response, a loading message is displayed in the data-display component.
4. A response is received containing the 3-letter ISO A-3 country code for the selected SVG path, along with 4 basic data points.
5. The A-3 country code is used to request population and GDP data through World Bank's "Advanced Data API".
6. The advanced data and simple data are displayed simultaneously in the data-display component.

# Q&A
Q: Why not send both the simple and advanced requests at the same time?  
A: The world map SVG file only contains the 2-letter codes in each <path> element. The only way to get the 3-letter code is via the basic API. Editing the SVG file to include the A-3 codes would solve the issue, but is not allowed according to the project specification.

Q: Why not display the simple data immediately, then show the advanced data when it arrives?  
A: The simple data arrives nearly instantly, but the advanced data takes 1-2 seconds to arrive. This discontinuity is difficult to explain to the user through design language, so I opted to instead show both data sets when the advanced data arrives.


# Angular Config:
- Angular CLI: 17.3.11
- Node: 20.11.1
- Package Manager: npm 10.2.4
- OS: win32 x64
- Angular: 17.3.12
