from astropy.io import fits
from astropy.table import Table

# set memmap=True for large files
hdu_list =  fits.open("./uploads/testFile.fits", memmap=True)
print(hdu_list.info())
    # select the HDU you want
hdu = hdu_list[1].data
    # read into an astropy Table object
table = Table(hdu)

    # write to a CSV file
table.write('./uploads/file2.csv', delimiter=',', format='ascii.ecsv',overwrite=True)