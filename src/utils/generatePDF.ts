import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfmake as any).vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = ( totalCost : string, totalQuantity : string ) =>{

  const docDefinition : TDocumentDefinitions = {
    content: [
      {
        text: 'Relatorio de produtos',
        style: 'Header',
        alignment: 'center'
      },
      {
        columns: [
          {
            text: 'Custo total dos Produtos',
            alignment : 'left'
          },
          {
            text: totalCost,
            alignment: 'right'
          }
        ],
        style: 'row'
      },
      {
        columns : [
          {
            text: 'Quantidade total de produtos',
            alignment : 'left'
          },
          {
            text: totalQuantity,
            alignment: 'right'
          }
        ],
        style: 'row'
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      content: {
        fontSize: 14,
      }
    }
  };
    
    const pdf = pdfmake.createPdf(docDefinition);
    pdf.getBlob( blob => {
      const url = URL.createObjectURL(blob);
      window.open(url,'_blank');
    });
} 