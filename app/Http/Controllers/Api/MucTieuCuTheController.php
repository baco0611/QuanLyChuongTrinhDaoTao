<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MucTieuCuTheCreateReSource;
use App\Http\Resources\MucTieuCuTheUpdateReSource;
use App\Models\MucTieuCuThe;
use App\Service\MucTieuCuTheService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class MucTieuCuTheController extends Controller
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
       $idChuongTrinh =$data[0]['idCTDT'];
       foreach($data as $val) {
           $mtct = new MucTieuCuThe();
           $mtct->kiHieu = $val['kiHieu'];
           $mtct->noiDung= $val['noiDung'];
           $mtct->loaiMucTieu= $val['loaiMucTieu'];
           $mtct->idChuongTrinh= intval($val['idCTDT']);
           $mtct->save();
       }
       $MTCTService = new MucTieuCuTheService();
       $listItem = $MTCTService->getList($idChuongTrinh);
       $listMucTieu =  MucTieuCuTheCreateReSource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listMucTieu
    ], HttpResponse::HTTP_OK);
    }
    public function storeUpdate(Request $request)
    {
       $data = $request['data'];
       $idChuongTrinh =$data[0]['idCTDT'];
       $MTCTService = new MucTieuCuTheService();
       foreach($data as $val) {
        $MTCTService->update($val);
       }
       $listItem = $MTCTService->getList($idChuongTrinh);
       $listMucTieu =  MucTieuCuTheUpdateReSource::collection($listItem);
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listMucTieu
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
        $MTCTService = new MucTieuCuTheService();
        $listItem = $MTCTService->getList($id);
        $listMucTieu =  MucTieuCuTheUpdateReSource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($id),
            'data' => $listMucTieu
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
        $idChuongTrinh =$data[0]['idCTDT'];
        $MTCTService = new MucTieuCuTheService();
        foreach($data as $val) {
            $MTCTService->delete($val);
        }
        $listItem = $MTCTService->getList($idChuongTrinh);
        $listMucTieu =  MucTieuCuTheUpdateReSource::collection($listItem);
         return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listMucTieu
        ], HttpResponse::HTTP_OK);
    }
}