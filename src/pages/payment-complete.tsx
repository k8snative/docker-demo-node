import type { NextPage } from 'next'
import Image from 'next/image'
import Row from 'react-bootstrap/Row'
import Header from "../components/Header";
import SeoHead from "../components/SeoHead";
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/router';
import GradientBtn from '~components/GradientBtn/GradientBtn';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Api from 'src/lib/api';
import { useDispatch, useSelector } from 'react-redux';
import * as querystring from 'querystring';
import { clearFilters, clearBuyNow, clearPurchaseInfo } from 'src/lib/redux/auth/action';
// import {
//   clearBuyNow,
//   clearFilters,
//   clearPurchaseInfo,
// } from 'src/lib/redux/auth/action'


const Businesses: NextPage = ({ params, data, error }) => {

  const dispatch = useDispatch()
  const router = useRouter();
  const nift_Id = useSelector(state => state.auth.paymentId);

  useEffect(() => {
    let payment_id = data.pp_TxnRefNo || data.TransactionReferenceNumber || '';
   
      const api_url_path = [
        'payment_gateway/nift/status_inquiry',
        `?paymentId=TB${nift_Id}`,
        `&mode=${data.mode}`,
        `&rawData=${btoa(JSON.stringify(data))}`,
      ].join('');
      Api('GET', api_url_path).then(response => {
        const orderId = response?.data?.orderId;

        if(data.mode === "ibft"){
          const ResponseCode  = data?.pp_ResponseCode;
          if(ResponseCode == "000"){
            // Payment successful move to invoice
            dispatch(clearFilters());
            dispatch(clearBuyNow());
            dispatch(clearPurchaseInfo());
            router.push(`/payment/invoice/${response?.data?.orderId || ''}`);
          } else {
            router.push(`/payment`);
          }
        } else {
          // If Alfalah payment is success
          if(response?.data?.TransactionStatus == "Paid"){
            dispatch(clearFilters());
            dispatch(clearBuyNow());
            dispatch(clearPurchaseInfo());
            router.push(`/payment/invoice/${response?.data?.orderId || ''}`);
          } else {
            router.push(`/payment`);
          }
        }
       
      }).catch(error => {
        alert('Invalid transaction data');
      });
    
   
  }, [data.pp_TxnRefNo,nift_Id]);

  return (
    <div>
      <SeoHead
        title="Takaful Bazaar"
        description="Leading online insurance"
        customLinkTags={[
          {
            rel: "icon",
            href: "/favIcon.png",
          },
        ]}
      />
      <Header />
      <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
        <Spinner animation="border" style={{ width: 72, height: 72, borderWidth: 8, color: '#e91431' }} />
        {error ? (
          <div>
            <div style={{ fontSize: 30, fontWeight: 'bold' }}>Error!</div>
            <div>Something went wrong try again...</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 30, fontWeight: 'bold' }}>Finalizing Payment!</div>
            <div>This may take a few moments...</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const props = { data: {} };
  for (let i in query) {
    props.data[i] = query[i];
  }

  const streamPromise = new Promise((resolve, reject) => {
    let postBody = '';
    req.on('data', (data) => {
      postBody += data.toString();

    });
    req.on('end', () => {
      resolve(postBody);

    });
  });
  try {
    let rawParams: string = await streamPromise;
    let chunks = (rawParams || '').split('&').filter(v => !!v);
    props.data.mode = chunks.length ? 'ibft' : 'online';
    for (let i in chunks) {
      let [key, value] = i.split('=');
      if (value) {
        props.data[key] = value;
      }
    }
    props.data = {
      ...props.data,
      ...querystring.parse(rawParams),
    }
  } catch (error) {
    props.error = true;
  }
  return {
    props,
  };
}

export default Businesses;

