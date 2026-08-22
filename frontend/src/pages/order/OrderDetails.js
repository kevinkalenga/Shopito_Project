import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrder } from '../../redux/features/order/orderSlice';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import OrderDetailsComps from './OrderDetailsComps';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const downloadPdf = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(
        pdfWidth / imageWidth,
        pdfHeight / imageHeight
      );
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );

      pdf.save(`shopitoAppInvoice.pdf`);
    });
  };

  return (
    <section style={{ height: "100vh" }}>
      <OrderDetailsComps orderPageLink={"/order-history"}  downloadPdf={downloadPdf} pdfRef={pdfRef} />
    </section>
  );
};

export default OrderDetails;