<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MaTranHocPhanChuanDauRaResource;
use App\Models\MaTranHocPhanChuanDauRa;
use App\Service\ChuongTrinhDaoTaoService;
use App\Service\MaTranHocPhanChuanDauRaService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class MaTranHocPhanChuanDauRaController extends Controller
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
        $ctdt = new ChuongTrinhDaoTaoService();
        $matranService = new MaTranHocPhanChuanDauRaService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
       foreach($data as $val) {
           $matran = new MaTranHocPhanChuanDauRa();
           $matran->idChuongTrinh=$idChuongTrinh;
           $matran->idChuanDauRa=$val['PLO'];
           $matran->idChuongTrinhChiTiet=$val['idCTCT'];
           $matran->mucDoDapUng=$val['mucDoDapUng'];
           $matran->save();
       }
       $listItem = $matranService->getList($idChuongTrinh);
       $listMaTran = MaTranHocPhanChuanDauRaResource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listMaTran,
        'status'=>HttpResponse::HTTP_OK
    ], HttpResponse::HTTP_OK);
    }
    public function storeUpdate(Request $request)
    {
        $data = $request['data'];
        $idChuongTrinh = $request['idCTDT'];
        $ctdt = new ChuongTrinhDaoTaoService();
        $matranService = new MaTranHocPhanChuanDauRaService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        foreach($data as $val) {
            $matranService->update($val,$idChuongTrinh);
         }
       $listItem = $matranService->getList($idChuongTrinh);
       $listMaTran = MaTranHocPhanChuanDauRaResource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listMaTran,
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
        $MaTranService = new MaTranHocPhanChuanDauRaService();
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($id);
        $listItem = $MaTranService->getList($id);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $listMaTran = MaTranHocPhanChuanDauRaResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($id),
            'checkData' => $listMaTran,
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
        $MaTranService = new MaTranHocPhanChuanDauRaService();
        if (!empty($data)){
            foreach($data as $val) {
                $MaTranService->delete($val,$idChuongTrinh);
            }
        }
        $listItem = $MaTranService->getList($idChuongTrinh);
        $listMaTran = MaTranHocPhanChuanDauRaResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listMaTran,
            'status'=>HttpResponse::HTTP_OK
        ], HttpResponse::HTTP_OK);
    }
}