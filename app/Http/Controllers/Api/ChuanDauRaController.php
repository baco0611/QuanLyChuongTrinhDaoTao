<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuanDauRaCreateResource;
use App\Http\Resources\ChuanDauRaUpdateResource;
use App\Models\ChuanDauRa;
use App\Service\ChuanDauRaService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class ChuanDauRaController extends Controller
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
        if (empty($data)) {
            return response()->json([
                'data' => []
            ]);
        }
       $idChuongTrinh =$data[0]['idCTDT'];
       foreach($data as $val) {
           $cdt = new ChuanDauRa();
           $cdt->kiHieu = $val['kiHieu'];
           $cdt->noiDung= $val['noiDung'];
           $cdt->loaiChuanDauRa= $val['loaiChuanDauRa'];
           $cdt->loaiChuanDauRaChiTiet= $val['loaiChuanDauRaChiTiet'];
           $cdt->trinhDoNangLuc= $val['trinhDoNangLuc'];
           $cdt->idChuongTrinh= intval($val['idCTDT']);
           $cdt->save();
       }
       $CDRService = new ChuanDauRaService();
       $listItem = $CDRService->getList($idChuongTrinh);
       $listCDR = ChuanDauRaCreateResource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listCDR
    ], HttpResponse::HTTP_OK);
    }

    public function storeUpdate(Request $request)
    {
       $data = $request['data'];
       if (empty($data)) {
        return response()->json([
            'data' => []
        ]);
    }
       $idChuongTrinh =$data[0]['idCTDT'];
       $CDRService = new ChuanDauRaService();
       foreach($data as $val) {
        $CDRService->update($val);
       }
       $listItem = $CDRService->getList($idChuongTrinh);
       $listCDR = ChuanDauRaUpdateResource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listCDR
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
        $CDRService = new ChuanDauRaService();
        $listItem = $CDRService->getList($id);
        if (empty(json_decode( $listItem))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $listCDR =  ChuanDauRaUpdateReSource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($id),
            'data' => $listCDR
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
        if (empty($data)) {
            return response()->json([
                'status' => HttpResponse::HTTP_OK
            ]);
        }
        $idChuongTrinh =$data[0]['idCTDT'];
        $CDRService = new ChuanDauRaService();
        foreach($data as $val) {
            $CDRService->delete($val);
        }
        $listItem = $CDRService->getList($idChuongTrinh);
        $listCDR =  ChuanDauRaUpdateReSource::collection($listItem);
         return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listCDR
        ], HttpResponse::HTTP_OK);
    }
}