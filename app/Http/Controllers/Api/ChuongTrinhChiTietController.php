<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuongTrinhChiTietResource;
use App\Models\ChuongTrinhChiTiet;
use App\Service\ChuongTrinhChiTietService;
use App\Service\ChuongTrinhDaoTaoService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class ChuongTrinhChiTietController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeCreate(Request $request)
    {
        $data = $request['data'];
        $idChuongTrinh = $request['idCTDT'];
        $CTCTService = new ChuongTrinhChiTietService();
        $listItem = $CTCTService->getList($idChuongTrinh);
        $listCTCT = ChuongTrinhChiTietResource::collection($listItem);
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
         foreach($data as $val) {
            if (($val['khoiKienThuc']=="CHUYEN_NGHIEP") && ($val['chiTietKhoiKienThuc']=="")) 
            {
                return response()->json([
                    'messenger'=>"chiTietKhoiKienThuc not null",
                    'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
                ]);
            }
            if ($val['khoiKienThuc']=="DAI_CUONG")
            {
                $mess="";
               if ( $val['chiTietKhoiKienThuc']!="")
               {
                $mess.="chiTietKhoiKienThuc allow null";
               }
               if ($val['thayTheKhoaLuan']!=false)
               {
                $mess.=" thayTheKhoaLuan not true";
               }
               if ($val['idChuyenNganh']!="")
               {
                $mess.=" idChuyenNganh allow null";
               }
               if($mess!="")
               {
                return response()->json([
                    'messenger'=>$mess,
                    'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
                ]);
               }
            }
            if ($val['idChuyenNganh']=="" && $val['thayTheKhoaLuan']==true)
            {
             return response()->json([
                 'messenger'=>"thayTheKhoaLuan not true",
                 'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
             ]);
            }
            if ($CTCTService->checkMaHocPhan($val['tienQuyet'])==false) 
            {
                return response()->json([
                    'messenger'=>"khong ton tai ma hoc phan trong tienQuyet",
                    'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
                ]);
            }
            if ($CTCTService->checkMaHocPhan($val['hocTruoc'])==false) 
            {
                return response()->json([
                    'messenger'=>"khong ton tai ma hoc phan trong hocTruoc",
                    'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
                ]);
            }
            if ($CTCTService->checkMaHocPhan($val['songHanh'])==false) 
            {
                return response()->json([
                    'messenger'=>"khong ton tai ma hoc phan trong songHanh",
                    'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
                ]);
            }
            $ctct = new ChuongTrinhChiTiet();
            $strHocTruoc=json_encode($val['hocTruoc']);
            $ctct->DeCuongHocPhanId=$val['idDeCuongHocPhan'];
            $ctct->thayThe=$val['thayTheKhoaLuan'];
            $ctct->batBuoc=$val['batBuoc'];
            $ctct->tienQuyet=json_encode($val['tienQuyet']);
            $ctct->hocTruoc=json_encode($val['hocTruoc']);
            $ctct->songHanh=json_encode($val['songHanh']);
            $ctct->hocKy=$val['hocKy'];
            $ctct->khoiKienThuc=$val['khoiKienThuc'];
            $ctct->chiTietKhoiKienThuc=$val['chiTietKhoiKienThuc'];
            $ctct->idChuyenNganh=$val['idChuyenNganh'];
            $ctct->idChuongTrinh= $idChuongTrinh;
            $ctct->save();
         }
         $listItem = $CTCTService->getList($idChuongTrinh);
        $listCTCT = ChuongTrinhChiTietResource::collection($listItem);
         return response()->json([
          'idCTDT'=>intval($idChuongTrinh),
          'data' => $listCTCT,
          'status'=>HttpResponse::HTTP_OK
      ], HttpResponse::HTTP_OK);
    }

    public function storeUpdate(Request $request)
    {
       $data = $request['data'];
       $idChuongTrinh =$request['idCTDT'];
       $CTCTService = new ChuongTrinhChiTietService();
       $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
       foreach($data as $val) {
        $CTCTService->update($val);
       }
       $listItem = $CTCTService->getList($idChuongTrinh);
       $listCTCT = ChuongTrinhChiTietResource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listCTCT,
        'status'=>HttpResponse::HTTP_OK
    ], HttpResponse::HTTP_OK);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $CTCTService = new ChuongTrinhChiTietService();
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($id);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $listItem = $CTCTService->getList($id);
        $listCTCT = ChuongTrinhChiTietResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($id),
            'data' =>  $listCTCT,
            'status'=>HttpResponse::HTTP_OK
        ], HttpResponse::HTTP_OK);
    }
   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = $request['deleteData'];
        $idChuongTrinh =$request['idCTDT'];
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $CTCTService = new ChuongTrinhChiTietService();
        if (!empty($data)){
            foreach($data as $val) {
                $CTCTService ->delete($val);
            }
        }
        $listItem = $CTCTService->getList($idChuongTrinh);
        $listCTCT = ChuongTrinhChiTietResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' =>  $listCTCT,
            'status'=>HttpResponse::HTTP_OK
        ], HttpResponse::HTTP_OK);
    }
}