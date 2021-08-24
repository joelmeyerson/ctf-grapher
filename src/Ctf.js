// function to calculate ctf, returns an array of objects with contrast and spatial frequency values (1/Å)
// LaTex: CTF = sin(\ $-$\pi\ \Delta z\ \lambda\ f^2 \  + \ \frac{\pi\ Cs \ \lambda^3 \ f^4}{2} \ )

export function getCtfData(v, d) {

  // values for ctf calculation (adapted from Takinori Nakane)
  var voltage = v; // V
  var defocus = d; // Å
  var cs = 2.7e7; // Å
  var eWavelength = calculateElectronWavelength(voltage); //  Å

  // calculate electron wavelength, takes U in V, returns in Å (adapted from Takinori Nakane)
  function calculateElectronWavelength(U) {
    var h = 6.626e-34; // Planck's constant, Js or kgm^2/s
    var e = 1.602e-19; // electron charge, C, note that CV = J
    var c = 3.0e8; // speed of light, m/s
    var m0 = 9.109e-31; // electron rest mass, kg

    // prettier-ignore
    //return h / Math.sqrt(2 * m0 * e * U) / Math.sqrt(1 + e * U / (2 * m0 * c * c)) * 1e10
    var term1 = h / Math.sqrt(2 * m0 * e * U); // h / sqrt(2 * m0 * e * V)
    var term2 = 1 / Math.sqrt(1 + e * U / (2 * m0 * c * c)); // 1 / (sqrt(1 + eV / 2mc^2))
    var m2A = 1e10 // convert meter to Å
    var lambda = term1 * term2 * m2A
    return lambda
  }

  // generate data with y (contrast) and x (spatial frequency)
  var points = 400; // sampling for x axis
  var pointArray = Array.from(Array(points).keys());

  // spatial frequency, units 1 / Å
  var sf = pointArray.map((el) => {
    return el * 1e-3;
  });

  // contrast, range -1 to 1
  var contrast = sf.map((el) =>
    Math.sin(
      -Math.PI * defocus * eWavelength * Math.pow(el, 2) +
        (Math.PI * cs * Math.pow(eWavelength, 3) * Math.pow(el, 4)) / 2
    )
  );

  // put sf and contrast into data array
  var data = new Array(points).fill(0);
  data.forEach((el, i) => {
    return (data[i] = {
      sf: sf[i],
      contrast: contrast[i],
    });
  });

  return data;
}
