import requests
import tabula
from tabula.io import read_pdf
from io import BytesIO


def mainFunction(form_data):
    # form_data = [subject, year, code, series, variant, coreORextended]
    subject = ''
    year = (form_data[0])
    code = form_data[1]
    series = form_data[2]
    variant = int(form_data[3])
    coreORextended = form_data[4]

    if code == '0610':
        subject = 'Biology'
    elif code == '0620':
        subject = 'Chemistry'
    elif code == '0625':
        subject = 'Physics'
    else:
        print('ERROR LINE 17')

    ms_url = f"https://papers.gceguide.com/Cambridge%20IGCSE/{subject}%20({code})/20{str(year)}/{code}_{series}{str(year)}_ms_{coreORextended}{variant}.pdf"
    qp_url = f"https://papers.gceguide.com/Cambridge%20IGCSE/{subject}%20({code})/20{str(year)}/{code}_{series}{str(year)}_qp_{coreORextended}{variant}.pdf"

    response = requests.get(ms_url)
    pdf_bytes = response.content
    if response.status_code == 200:
        pdf_bytes = response.content
    else:
        print(f"Error: Failed to retrieve the PDF. Status code: {response.status_code}")

    tables = tabula.read_pdf(BytesIO(pdf_bytes), pages='all', multiple_tables=True)

    #paper_data = [subject, year, code, series, variant, coreORextended]
    pd_subject = subject
    pd_year = year
    pd_code = code
    pd_series = series
    pd_variant = variant
    pd_coreorextended = coreORextended

    # Extracted Data stored here
    table_data = {}

    # Process the tables
    for table in tables:
        for row in table.values:
            question_number = row[0]
            answer_letter = row[1]

            table_data[question_number] = answer_letter
    return qp_url, table_data, pd_subject, pd_year, pd_code, pd_series, pd_variant, pd_coreorextended
